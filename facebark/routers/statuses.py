from fastapi import APIRouter, Depends, Response, status
from typing import List, Union, Optional
from queries.statuses import (
    Error,
    StatusIn,
    StatusOut,
    StatusesOut,
    StatusRepository,
)

router = APIRouter()


@router.get("/statuses", response_model=Union[Error, List[StatusOut]])
def get_all(
    repo: StatusRepository = Depends(),
):
    return repo.get_all()


@router.get("/statuses/{account_id}", response_model=List[StatusOut])
def get_statuses_by_account_id(
    account_id: int,
    repo: StatusRepository = Depends(),
) -> StatusOut:
    try:
        record = repo.get_statuses_by_account_id(account_id)
        if record is not None:
            return record
    except Exception:
        return status.HTTP_404_NOT_FOUND


@router.post("/statuses", response_model=Union[StatusOut, Error])
def create_status(status: StatusIn, repo: StatusRepository = Depends()):
    return repo.create(status)


@router.delete("/statuses/{status_id}", response_model=bool)
def delete_status(status_id: int, repo: StatusRepository = Depends()) -> bool:
    return repo.delete(status_id)
