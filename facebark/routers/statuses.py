from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.statuses import (
    Error,
    StatusIn,
    StatusOut,
    StatusesOut,
    StatusRepository,
)

router = APIRouter()


@router.get("/statuses", response_model=Union[StatusesOut, Error])
def get_statuses(repo: StatusRepository = Depends()):
    return {"statuses": repo.get_all()}


@router.post("/statuses", response_model=Union[StatusOut, Error])
def create_status(status: StatusIn, repo: StatusRepository = Depends()):
    return repo.create(status)


@router.delete("/statuses/{status_id}", response_model=bool)
def delete_status(status_id: int, repo: StatusRepository = Depends()) -> bool:
    return repo.delete(status_id)
