from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.accounts import (
    Error,
    AccountIn,
    AccountOut,
    AccountRepository,
)


router = APIRouter()


@router.get("/accounts", response_model=Union[List[AccountOut], Error])
def get_all(
    repo: AccountRepository = Depends(),
):
    return repo.get_all()
