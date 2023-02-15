from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.statuses import (
    Error,
    StatusOut,
    StatusesOut,
    StatusRepository
)

router = APIRouter()

@router.get("/statuses", response_model=Union[StatusesOut, Error])
def get_statuses(
    repo: StatusRepository = Depends(),
):
    return repo.get_all()
