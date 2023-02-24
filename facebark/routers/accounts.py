from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    APIRouter,
    Request,
    status,
)
from jwtdown_fastapi.authentication import Token
from passlib.hash import bcrypt
from authenticator import authenticator
from pydantic import BaseModel
from typing import Union, List, Optional
from queries.accounts import (
    Error,
    AccountIn,
    AccountOut,
    AccountOutWithPassword,
    AccountsOut,
    AccountRepository,
    DuplicateAccountError,
)


class AccountForm(BaseModel):
    username: str
    password: str


class HttpError(BaseModel):
    detail: str


class AccountToken(Token):
    account: AccountOutWithPassword


router = APIRouter()


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOutWithPassword = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.get("/accounts", response_model=Union[List[AccountOut], Error])
def get_all(
    repo: AccountRepository = Depends(),
):
    # return {"accounts": repo.get_all_accounts()}
    return repo.get_all_accounts()


@router.get("/accounts/{id}", response_model=Optional[AccountOut])
def get_account(
    id: int,
    repo: AccountRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> AccountOut:
    try:
        record = repo.get_account_by_id(id)
        if record is not None and account_data:
            return record
    except Exception:
        return status.HTTP_404_NOT_FOUND


@router.post("/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountRepository = Depends(),
):
    print("this is the info: ", info)
    print("this is the password: ", info.password)
    print("this the repo: ", accounts)
    print("this the request: ", request)
    print("this the response: ", response)
    hashed_password = authenticator.hash_password(info.password)
    print("this is the hashed pwd", hashed_password)
    print(isinstance(hashed_password, str))
    try:
        account = accounts.create(info, hashed_password)
        print("this is the account!", account)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    print("this is the form: ", form)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())