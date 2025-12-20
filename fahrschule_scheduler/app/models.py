from datetime import date, datetime
from typing import List, Optional
from pydantic import BaseModel


class Student(BaseModel):
    student_id: str
    name: str
    phone: Optional[str] = None
    status: Optional[str] = "aktiv"


class Availability(BaseModel):
    student_id: str
    weekday: int  # 1=Montag .. 6=Samstag
    window_index: int
    start_time: str  # "HH:MM"
    end_time: str
    created_at: Optional[datetime] = None
    status: Optional[str] = "open"


class BlockTime(BaseModel):
    week_start: date
    weekday: int
    start_time: str
    end_time: str
    reason: Optional[str] = None
    created_at: Optional[datetime] = None


class WeeklyNeed(BaseModel):
    """
    Fahrlehrer trägt pro Schüler (über Name) ein:
    - wie viele 45-Minuten-Blöcke pro Fahrart
    - wie viele Termine in der Woche (appointments_count)
    """
    week_start: date
    student_name: str                 # kommt direkt aus dem Tally Formular
    student_id: Optional[str] = None  # optional, falls du irgendwann die ID doch mitsendest

    appointments_count: int           # Anzahl Termine in der Woche

    blocks_uebung: int = 0           # normale Übungsfahrten
    blocks_ueberland: int = 0
    blocks_nacht: int = 0
    blocks_autobahn: int = 0

    created_at: Optional[datetime] = None
    status: Optional[str] = "open"    # nur "open" wird geplant


class TeacherWorkHours(BaseModel):
    weekday: int           # 1=Montag .. 6=Samstag
    start_time: str        # "HH:MM"
    end_time: str          # "HH:MM"


class ScheduledAppointment(BaseModel):
    week_start: date
    date: date
    weekday: int
    start_time: str
    end_time: str
    student_id: str
    student_name: str

    # Gesamtanzahl 45-Minuten-Blöcke in diesem Termin
    blocks: int

    # Aufteilung nach Fahrart (für WhatsApp / Kommunikation)
    uebung_blocks: int = 0
    ueberland_blocks: int = 0
    nacht_blocks: int = 0
    autobahn_blocks: int = 0

    source: str = "auto"
    status: str = "geplant"  # später z.B. "bestaetigt"


class UnscheduledAppointment(BaseModel):
    student_id: Optional[str] = None
    student_name: str
    blocks: int
    reason: str


class ScheduleRequest(BaseModel):
    week_start: date
    slot_length_minutes: int = 45
    teacher_work_hours: List[TeacherWorkHours]
    students: List[Student]
    availabilities: List[Availability]
    block_times: List[BlockTime]
    weekly_needs: List[WeeklyNeed]


class ScheduleResponse(BaseModel):
    appointments: List[ScheduledAppointment]
    unscheduled: List[UnscheduledAppointment] = []
