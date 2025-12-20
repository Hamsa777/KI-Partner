from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import ScheduleRequest, ScheduleResponse
from .scheduler import schedule_week

app = FastAPI(title="Fahrschule Weekly Scheduler")

# CORS, damit du von Make / lokalem Frontend aus testen kannst
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in Produktion enger machen!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/schedule-week", response_model=ScheduleResponse)
def schedule_week_endpoint(payload: ScheduleRequest):
    """
    Nimmt week_start + Arrays (students, availabilities, block_times, weekly_needs)
    und gibt geplante Termine + unscheduled zurück.
    """
    return schedule_week(payload)
