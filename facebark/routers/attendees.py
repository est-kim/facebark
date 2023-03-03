from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.attendees import (
    Error,
    AttendeesIn,
    AttendeesOut,
    AttendeesRepository,
)
router = APIRouter()
@router.get("/attendees", response_model=Union[List[AttendeesOut], Error])
def get_all(
    repo: AttendeesRepository = Depends(),
):
    return repo.get_all()

@router.post("/attendees", response_model=Union[AttendeesOut, Error])
def create_attendees(
    attendees: AttendeesIn,
    response: Response,
    repo: AttendeesRepository = Depends()
):
    return repo.create(attendees)
