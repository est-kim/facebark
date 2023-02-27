from fastapi import APIRouter, Depends, Response
from queries.states import StateRepository, StateOut, Error
from typing import Union, List, Optional

router = APIRouter()


@router.get("/states", response_model=Union[Error, List[StateOut]])
def get_all(
    repo: StateRepository = Depends(),
):
    return repo.get_all()

# @router.get("/onestates/{state_id}", response_model=Optional[StateOut])
# def get_one_state(
#     state_id: int,
#     repo: StateRepository = Depends(),
# ) -> StateOut:
#     return repo.get_one(state_id)

# @router.get("/allstatesbyid/{state_id}", response_model=Union[Error, List[StateOut]])
# def get_all_cities(
#     state_id: int,
#     repo: StateRepository = Depends(),
# ):
#     return repo.get_all_onid(state_id)