from fastapi import APIRouter, Depends, Response, status
from queries.events import EventsIn, EventsRepository, EventsOut, Error
from typing import Union, List, Optional
from authenticator import authenticator

router = APIRouter()


@router.post("/events", response_model=Union[EventsOut, Error])
def create_events(
    event: EventsIn,
    response: Response,
    repo: EventsRepository = Depends(),
):

    return repo.create(event)


@router.get("/events", response_model=Union[Error, List[EventsOut]])
def get_all(
    repo: EventsRepository = Depends(),
):
    return repo.get_all()


@router.put("/events/{event_id}", response_model=Union[EventsOut, Error])
def update_event(
    event_id: int,
    event: EventsIn,
    repo: EventsRepository = Depends(),
) -> EventsOut:
    return repo.update(event_id, event)


@router.delete("/events/{event_id}", response_model=bool)
def delete_event(
    event_id: int,
    repo: EventsRepository = Depends(),
) -> bool:
    return repo.delete(event_id)


@router.get("/events/{event_id}", response_model=Optional[EventsOut])
def get_one_event(
    event_id: int,
    repo: EventsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> EventsOut:
    try:
        record = repo.get_one(event_id)
        if record is not None and account_data:
            return record
    except Exception:
        return status.HTTP_404_NOT_FOUND


@router.get(
    "/feed/events/{account_id}", response_model=Union[List[EventsOut], Error]
)
def get_events_in_state(
    account_id: int,
    repo: EventsRepository = Depends(),
):
    return repo.get_events_in_your_state(account_id)
