from fastapi import APIRouter, Depends, Response, status
from typing import Union, List
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


@router.get("/attendees/{event_id}", response_model=List[AttendeesOut])
def get_attendees_by_event_id(
    event_id: int, repo: AttendeesRepository = Depends()
) -> AttendeesOut:
    try:
        record = repo.get_attendees_by_event_id(event_id)
        if record is not None:
            return record
    except Exception:
        return status.HTTP_404_NOT_FOUND


@router.post("/attendees", response_model=Union[AttendeesOut, Error])
def create_attendees(
    attendees: AttendeesIn,
    response: Response,
    repo: AttendeesRepository = Depends(),
):
    return repo.create(attendees)
