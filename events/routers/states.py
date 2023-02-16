from fastapi import APIRouter, Depends
from queries.states import StateIn, StateRepository

router = APIRouter()

@router.post("/states")
def create_state(state: StateIn, repo: StateRepository = Depends()):
    
    return repo.create(state)
