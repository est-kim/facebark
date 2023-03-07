from fastapi import APIRouter, Depends
from queries.dog_parks import DogParkRepository, DogParkOut, Error
from typing import Union, List, Optional

router = APIRouter()


@router.get("/dog_parks", response_model=Union[Error, List[DogParkOut]])
def get_all(
    repo: DogParkRepository = Depends(),
):
    return repo.get_all()


@router.get("/dog_parks/{dog_park_id}", response_model=Optional[DogParkOut])
def get_one_state(
    dog_park_id: int,
    repo: DogParkRepository = Depends(),
) -> DogParkOut:
    return repo.get_one(dog_park_id)
