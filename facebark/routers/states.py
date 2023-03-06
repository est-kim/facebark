from fastapi import APIRouter, Depends, Response
from queries.states import StateRepository, StateOut, Error
from typing import Union, List, Optional

router = APIRouter()


@router.get("/states", response_model=Union[Error, List[StateOut]])
def get_all(
    repo: StateRepository = Depends(),
):
    return repo.get_all()
