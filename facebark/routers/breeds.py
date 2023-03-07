from fastapi import APIRouter, Depends
from queries.breeds import BreedRepository, BreedOut, Error
from typing import Union, List

router = APIRouter()


@router.get("/breeds", response_model=Union[Error, List[BreedOut]])
def get_all(
    repo: BreedRepository = Depends(),
):
    return repo.get_all()
