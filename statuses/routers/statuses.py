from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.statuses import (
    Error,
    StatusIn,
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


@router.post("/statuses", response_model=Union[StatusesOut, Error])
def create_status(
    status: StatusIn,
    response: Response,
    repo: StatusRepository = Depends()
):
    response.status_code = 400
    return repo.create(status)
