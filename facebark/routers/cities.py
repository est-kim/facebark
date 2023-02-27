from fastapi import APIRouter, Depends, Response
from queries.cities import CityRepository, CityOut, Error
from typing import Union, List

router = APIRouter()


@router.get("/cities", response_model=Union[Error, List[CityOut]])
def get_all(
    repo: CityRepository = Depends(),
):
    return repo.get_all()

@router.get("/cities/{state_id}", response_model=Union[List[CityOut], Error])
def get_by_state_id(
    state_id: int,
    repo: CityRepository = Depends(),
):
    return repo.get_cities_by_state_id(state_id)
