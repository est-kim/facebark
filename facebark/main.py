from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from fastapi import APIRouter
from routers import (
    states,
    accounts,
    events,
    statuses,
    cities,
    dog_parks,
    breeds,
)


app = FastAPI()

app.include_router(accounts.router)
app.include_router(states.router)
app.include_router(statuses.router)
app.include_router(events.router)
app.include_router(cities.router)
app.include_router(dog_parks.router)
app.include_router(authenticator.router)
app.include_router(breeds.router)



app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.get("/api/launch-details")
# def launch_details():
#     return {
#         "launch_details": {
#             "year": 2022,
#             "month": 12,
#             "day": "9",
#             "hour": 19,
#             "min": 0,
#             "tz:": "PST",
#         }
#     }
