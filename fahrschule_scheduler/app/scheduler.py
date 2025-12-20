from __future__ import annotations

from dataclasses import dataclass
from datetime import date, datetime, time, timedelta
from typing import DefaultDict, Dict, List, Optional, Tuple
from collections import defaultdict

from .models import (
    Availability,
    BlockTime,
    ScheduleRequest,
    ScheduleResponse,
    ScheduledAppointment,
    Student,
    TeacherWorkHours,
    UnscheduledAppointment,
    WeeklyNeed,
)


def parse_time(value: str) -> time:
    # akzeptiert auch "7:00" etc. zuverlässig
    return datetime.strptime(value.strip(), "%H:%M").time()


def time_to_str(t: time) -> str:
    return t.strftime("%H:%M")


# ---------- Zeit-/Intervall-Helpers ----------

def weekday_to_date(week_start: date, weekday: int) -> date:
    # weekday: 1=Mo .. 6=Sa
    return week_start + timedelta(days=weekday - 1)


def dt_on_weekday(week_start: date, weekday: int, t: time) -> datetime:
    return datetime.combine(weekday_to_date(week_start, weekday), t)


def overlaps(a_start: datetime, a_end: datetime, b_start: datetime, b_end: datetime) -> bool:
    return (a_start < b_end) and (a_end > b_start)


def ceil_dt_to_step(dt: datetime, step_minutes: int) -> datetime:
    # rundet nach oben auf das nächste step-Minuten Raster
    minute = dt.minute
    remainder = minute % step_minutes
    if remainder == 0 and dt.second == 0 and dt.microsecond == 0:
        return dt.replace(second=0, microsecond=0)
    add = step_minutes - remainder
    base = dt.replace(second=0, microsecond=0)
    return base + timedelta(minutes=add)


def build_teacher_windows(
    week_start: date,
    teacher_work_hours: List[TeacherWorkHours],
) -> Dict[int, List[Tuple[datetime, datetime]]]:
    """
    Pro weekday eine Liste von Arbeitszeit-Intervallen als datetime.
    Unterstützt "über Mitternacht": wenn end <= start -> end + 1 Tag.
    """
    windows: Dict[int, List[Tuple[datetime, datetime]]] = defaultdict(list)

    for wh in teacher_work_hours:
        start_t = parse_time(wh.start_time)
        end_t = parse_time(wh.end_time)

        start_dt = dt_on_weekday(week_start, wh.weekday, start_t)
        end_dt = dt_on_weekday(week_start, wh.weekday, end_t)

        if end_dt <= start_dt:
            end_dt += timedelta(days=1)

        windows[wh.weekday].append((start_dt, end_dt))

    # sortieren
    for wd in windows:
        windows[wd].sort(key=lambda x: x[0])

    return windows


def build_block_intervals(
    week_start: date,
    block_times: List[BlockTime],
) -> Dict[int, List[Tuple[datetime, datetime]]]:
    """
    Blockzeiten als datetime-Intervalle pro weekday.
    (Wenn end <= start, behandeln wir es als über Mitternacht.)
    """
    blocked: Dict[int, List[Tuple[datetime, datetime]]] = defaultdict(list)

    for bt in block_times:
        start_t = parse_time(bt.start_time)
        end_t = parse_time(bt.end_time)

        start_dt = dt_on_weekday(week_start, bt.weekday, start_t)
        end_dt = dt_on_weekday(week_start, bt.weekday, end_t)

        if end_dt <= start_dt:
            end_dt += timedelta(days=1)

        blocked[bt.weekday].append((start_dt, end_dt))

    for wd in blocked:
        blocked[wd].sort(key=lambda x: x[0])

    return blocked


def build_student_windows(
    week_start: date,
    availabilities: List[Availability],
) -> Dict[str, Dict[int, List[Tuple[datetime, datetime]]]]:
    """
    Pro student_id und weekday: Liste von Verfügbarkeitsfenstern als datetime-Intervalle.
    WICHTIG: mehrere Zeitfenster pro Tag werden NICHT überschrieben, sondern gesammelt.
    """
    windows: Dict[str, Dict[int, List[Tuple[datetime, datetime]]]] = defaultdict(lambda: defaultdict(list))

    for av in availabilities:
        if av.status and av.status != "open":
            continue

        start_t = parse_time(av.start_time)
        end_t = parse_time(av.end_time)

        start_dt = dt_on_weekday(week_start, av.weekday, start_t)
        end_dt = dt_on_weekday(week_start, av.weekday, end_t)

        if end_dt <= start_dt:
            end_dt += timedelta(days=1)

        windows[av.student_id][av.weekday].append((start_dt, end_dt))

    # sortieren
    for sid in windows:
        for wd in windows[sid]:
            windows[sid][wd].sort(key=lambda x: x[0])

    return windows


def interval_within_any(
    interval_start: datetime,
    interval_end: datetime,
    containers: List[Tuple[datetime, datetime]],
) -> bool:
    """
    True wenn [interval_start, interval_end] vollständig innerhalb eines Containers liegt.
    """
    for c_start, c_end in containers:
        if interval_start >= c_start and interval_end <= c_end:
            return True
    return False


def interval_overlaps_any(
    interval_start: datetime,
    interval_end: datetime,
    intervals: List[Tuple[datetime, datetime]],
) -> bool:
    for s, e in intervals:
        if overlaps(interval_start, interval_end, s, e):
            return True
    return False


# ---------- Terminaufgaben ----------

@dataclass
class AppointmentTask:
    student_id: str
    student_name: str
    blocks: int
    uebung_blocks: int = 0
    ueberland_blocks: int = 0
    nacht_blocks: int = 0
    autobahn_blocks: int = 0


def split_blocks_into_appointments(blocks_total: int, appointments_count: int) -> List[int]:
    if appointments_count <= 0:
        return [blocks_total]

    base = blocks_total // appointments_count
    remainder = blocks_total % appointments_count
    sizes: List[int] = []

    for i in range(appointments_count):
        size = base + (1 if i < remainder else 0)
        if size > 0:
            sizes.append(size)

    return sizes


def compute_student_flexibility(
    student_id: str,
    student_windows: Dict[str, Dict[int, List[Tuple[datetime, datetime]]]],
    teacher_windows: Dict[int, List[Tuple[datetime, datetime]]],
    occupied_by_day: Dict[int, List[Tuple[datetime, datetime]]],
    blocks: int,
    block_minutes: int,
    step_minutes: int,
) -> int:
    """
    Zählt grob wie viele mögliche Startpositionen es für diesen Schüler geben könnte
    (unter Berücksichtigung von Lehrer-Arbeitszeit + Blockzeiten, ohne bereits geplante Termine).
    """
    dur = timedelta(minutes=blocks * block_minutes)
    count = 0

    for weekday in range(1, 7):
        s_windows = (student_windows.get(student_id) or {}).get(weekday, [])
        t_windows = teacher_windows.get(weekday, [])
        blocked = occupied_by_day.get(weekday, [])

        if not s_windows or not t_windows:
            continue

        for (sw_start, sw_end) in s_windows:
            for (tw_start, tw_end) in t_windows:
                start = max(sw_start, tw_start)
                end = min(sw_end, tw_end)

                latest_start = end - dur
                if latest_start < start:
                    continue

                cur = ceil_dt_to_step(start, step_minutes)

                while cur <= latest_start:
                    cur_end = cur + dur
                    # vollständig in student+teacher window?
                    if cur_end <= end:
                        # nicht in blockzeiten überlappen
                        if not interval_overlaps_any(cur, cur_end, blocked):
                            count += 1
                    cur += timedelta(minutes=step_minutes)

    return count


def find_and_assign_interval_for_appointment(
    student_id: str,
    blocks: int,
    week_start: date,
    student_windows: Dict[str, Dict[int, List[Tuple[datetime, datetime]]]],
    teacher_windows: Dict[int, List[Tuple[datetime, datetime]]],
    occupied_by_day: Dict[int, List[Tuple[datetime, datetime]]],
    block_minutes: int,
    step_minutes: int,
) -> Optional[Tuple[int, time, time]]:
    """
    Findet eine freie Startzeit (Raster = step_minutes) mit Dauer blocks*block_minutes,
    innerhalb eines student windows UND teacher windows, ohne Overlap zu occupied_by_day
    (block_times + bereits gesetzte Termine).
    """
    dur = timedelta(minutes=blocks * block_minutes)

    for weekday in range(1, 7):
        s_windows = (student_windows.get(student_id) or {}).get(weekday, [])
        t_windows = teacher_windows.get(weekday, [])
        if not s_windows or not t_windows:
            continue

        occupied = occupied_by_day.setdefault(weekday, [])

        for (sw_start, sw_end) in s_windows:
            for (tw_start, tw_end) in t_windows:
                start = max(sw_start, tw_start)
                end = min(sw_end, tw_end)

                latest_start = end - dur
                if latest_start < start:
                    continue

                cur = ceil_dt_to_step(start, step_minutes)

                while cur <= latest_start:
                    cur_end = cur + dur

                    # innerhalb des gemeinsamen Fensters?
                    if cur_end <= end:
                        # Kollisionscheck gegen block_times + schon geplante Termine
                        if not interval_overlaps_any(cur, cur_end, occupied):
                            # reservieren
                            occupied.append((cur, cur_end))
                            occupied.sort(key=lambda x: x[0])
                            return weekday, cur.time(), cur_end.time()

                    cur += timedelta(minutes=step_minutes)

    return None


# ---------- Hauptfunktion ----------

def schedule_week(req: ScheduleRequest) -> ScheduleResponse:
    """
    Fixes enthalten:
    - mehrere Zeitfenster pro Tag werden wirklich berücksichtigt
    - weekday wird korrekt als Datum (week_start + offset) behandelt
    - Startzeiten sind NICHT mehr auf 45-Minuten-Raster fixiert:
      Dauer bleibt blocks*45, aber Start-Raster ist 15 Minuten (konfigurierbar)
    """
    BLOCK_MINUTES = int(req.slot_length_minutes)  # das ist die Blockdauer (45)
    STEP_MINUTES = 15  # Start-Raster (damit 08:00 / 12:00 / 23:00 funktionieren)

    # teacher windows als datetime
    teacher_windows = build_teacher_windows(req.week_start, req.teacher_work_hours)

    # occupied_by_day startet mit Blockzeiten (damit die direkt kollidieren)
    occupied_by_day = build_block_intervals(req.week_start, req.block_times)

    # student windows als datetime
    student_windows = build_student_windows(req.week_start, req.availabilities)

    students_by_id: Dict[str, Student] = {s.student_id: s for s in req.students}
    students_by_name: Dict[str, Student] = {s.name.strip().lower(): s for s in req.students}

    def resolve_student_for_need(need: WeeklyNeed) -> Optional[Student]:
        if getattr(need, "student_id", None):
            st = students_by_id.get(need.student_id)
            if st:
                return st
        if need.student_name:
            return students_by_name.get(need.student_name.strip().lower())
        return None

    tasks: List[AppointmentTask] = []
    unscheduled: List[UnscheduledAppointment] = []

    # 1) WeeklyNeeds -> Tasks
    for need in req.weekly_needs:
        if need.status and need.status != "open":
            continue

        student = resolve_student_for_need(need)

        totals_by_type: Dict[str, int] = {
            "uebung": need.blocks_uebung or 0,
            "ueberland": need.blocks_ueberland or 0,
            "nacht": need.blocks_nacht or 0,
            "autobahn": need.blocks_autobahn or 0,
        }
        total_blocks = sum(totals_by_type.values())

        if not student:
            if total_blocks > 0:
                unscheduled.append(
                    UnscheduledAppointment(
                        student_id=None,
                        student_name=need.student_name,
                        blocks=total_blocks,
                        reason="Schüler aus WeeklyNeed nicht in students-Liste gefunden",
                    )
                )
            continue

        if total_blocks <= 0:
            continue

        appointment_sizes = split_blocks_into_appointments(total_blocks, need.appointments_count)

        # Reihenfolge: spezielle Fahrten zuerst
        drive_type_order = ["nacht", "ueberland", "autobahn", "uebung"]
        drive_block_list: List[str] = []
        for dt in drive_type_order:
            drive_block_list.extend([dt] * (totals_by_type.get(dt, 0) or 0))

        idx = 0
        for size in appointment_sizes:
            sub = drive_block_list[idx: idx + size]
            idx += size
            if not sub:
                break

            tasks.append(
                AppointmentTask(
                    student_id=student.student_id,
                    student_name=student.name,
                    blocks=len(sub),
                    uebung_blocks=sub.count("uebung"),
                    ueberland_blocks=sub.count("ueberland"),
                    nacht_blocks=sub.count("nacht"),
                    autobahn_blocks=sub.count("autobahn"),
                )
            )

    # 2) Flexibilität pro Student (mit Blockzeiten berücksichtigt)
    flexibility: Dict[str, int] = {}
    for task in tasks:
        sid = task.student_id
        if sid not in flexibility:
            flexibility[sid] = compute_student_flexibility(
                student_id=sid,
                student_windows=student_windows,
                teacher_windows=teacher_windows,
                occupied_by_day=occupied_by_day,
                blocks=task.blocks,
                block_minutes=BLOCK_MINUTES,
                step_minutes=STEP_MINUTES,
            )

    # 3) Sortierung: unflexibel zuerst, dann größere Termine
    tasks.sort(key=lambda t: (flexibility.get(t.student_id, 9999), -t.blocks))

    appointments: List[ScheduledAppointment] = []

    # 4) Einplanen (reserviert teacher-Intervals direkt in occupied_by_day)
    for task in tasks:
        result = find_and_assign_interval_for_appointment(
            student_id=task.student_id,
            blocks=task.blocks,
            week_start=req.week_start,
            student_windows=student_windows,
            teacher_windows=teacher_windows,
            occupied_by_day=occupied_by_day,
            block_minutes=BLOCK_MINUTES,
            step_minutes=STEP_MINUTES,
        )

        if result is None:
            unscheduled.append(
                UnscheduledAppointment(
                    student_id=task.student_id,
                    student_name=task.student_name,
                    blocks=task.blocks,
                    reason="Keine ausreichend langen freien Slots gefunden",
                )
            )
            continue

        weekday, start_t, end_t = result
        appt_date = weekday_to_date(req.week_start, weekday)

        appointments.append(
            ScheduledAppointment(
                week_start=req.week_start,
                date=appt_date,
                weekday=weekday,
                start_time=time_to_str(start_t),
                end_time=time_to_str(end_t),
                student_id=task.student_id,
                student_name=task.student_name,
                blocks=task.blocks,
                uebung_blocks=task.uebung_blocks,
                ueberland_blocks=task.ueberland_blocks,
                nacht_blocks=task.nacht_blocks,
                autobahn_blocks=task.autobahn_blocks,
                source="auto",
                status="geplant",
            )
        )

    return ScheduleResponse(appointments=appointments, unscheduled=unscheduled)
