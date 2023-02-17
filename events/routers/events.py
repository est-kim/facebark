from fastapi import APIRouter, Depends
from queries.events import EventsIn, EventsRepository, EventsOut
from typing import Union, List, Optional

router= APIRouter()

@router.post("/events", response_model= EventsOut)
def create_events(
    event: EventsIn,
    repo: EventsRepository = Depends()
    ):
    
    return repo.create(event)
    

@router.get("/events", response_model= List[EventsOut])
def get_all(
    repo: EventsRepository = Depends(),
    ):
    return repo.get_all()

@router.put("/events/{event_id}", response_model=EventsOut)
def update_event(
    event_id: int,
    event: EventsIn,
    repo: EventsRepository = Depends(),
)-> EventsOut:
    return repo.update(event_id, event)

@router.delete("/events/{event_id}", response_model=bool)
def delete_event(
    event_id: int,
    repo: EventsRepository = Depends(),
)-> bool:
    return repo.delete(event_id)

# @router.get("/events/{event_id}", response_model=Optional)
# def get_one_event(
#     event_id: int,
#     repo: EventsRepository = Depends(),
# )-> EventsOut:
#     return repo.get_one(event_id)
