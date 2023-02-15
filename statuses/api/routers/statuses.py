from fastapi import APIRouter, Depends, Response
from typing import List, Union, Error
from queries.statuses import (
    StatusIn,
    StatusOut,
    StatusRepository
)

router = APIRouter()

@router.get("/statuses", response_model=Union[List[StatusOut], Error])
def get_all(
    repo: StatusRepository = Depends()
):
    return repo.get_all()
