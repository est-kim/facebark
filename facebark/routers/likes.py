from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.likes import LikeOut

# from queries.statuses import StatusOut
from queries.likes import (
    Error,
    LikeIn,
    LikeOut,
    LikeRepository,
)


router = APIRouter()


# @router.get("/following", response_model=Union[List[FollowingOut], Error])
# def get_all(
#     repo: FollowingRepository = Depends(),
# ):
#     return repo.get_all()


@router.post("/like", response_model=Union[LikeOut, Error])
def create_like(
    like: LikeIn,
    response: Response,
    repo: LikeRepository = Depends(),
):
    return repo.create(like)


# @router.get(
#     "/following/{account_id}", response_model=Union[List[AccountOut], Error]
# )
# def get_one_following(
#     account_id: int,
#     repo: FollowingRepository = Depends(),
# ):
#     return repo.get_all_following_for_one_account(account_id)


# @router.delete("/following/{followee_id}", response_model=bool)
# def delete_following(
#     follower_id: int,
#     followee_id: int,
#     repo: FollowingRepository = Depends(),
# ) -> bool:
#     return repo.delete(follower_id, followee_id)


# @router.get(
#     "/feed/{account_id}", response_model=Union[List[StatusOutVO], Error]
# )
# def get_statuses_for_accounts_following(
#     account_id: int,
#     repo: FollowingRepository = Depends(),
# ):
#     return repo.get_all_statuses_for_accounts_following(account_id)
