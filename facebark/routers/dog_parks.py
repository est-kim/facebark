from fastapi import APIRouter, Depends, Response
from queries.dog_parks import DogParkRepository, DogParkOut, Error
from typing import Union, List

router = APIRouter()


@router.get("/dog_parks", response_model=Union[Error, List[DogParkOut]])
def get_all(
    repo: DogParkRepository = Depends(),
):
    return repo.get_all()
