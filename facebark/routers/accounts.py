from fastapi import (
    Depends,
    Response,
    HTTPException,
    APIRouter,
    Request,
    status,
    File,
    UploadFile,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from typing import Union, List, Optional
from queries.accounts import (
    Error,
    AccountIn,
    AccountOut,
    AccountOutWithPassword,
    AccountUpdate,
    AccountRepository,
    DuplicateAccountError,
)
import boto3
from mimetypes import guess_type
from tempfile import NamedTemporaryFile
import imageio


class AccountForm(BaseModel):
    username: str
    password: str


class HttpError(BaseModel):
    detail: str


class AccountToken(Token):
    account: AccountOutWithPassword


AWS_ACCESS_KEY = "AKIAX5NY4QUFBRKBLF5I"
AWS_SECRET_ACCESS_KEY = "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"


s3 = boto3.client(
    "s3",
    region_name="us-west-1",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)

BUCKET_NAME = "facebark-pictures"


router = APIRouter()


def convert_mov_to_mp4(input_file, output_file):
    # Read the video file
    reader = imageio.get_reader(input_file)

    # Create a writer with the desired output format and codec
    fps = reader.get_meta_data()["fps"]
    writer = imageio.get_writer(
        output_file, fps=fps, codec="libx264", format="mp4"
    )

    # Write each frame to the output file
    for frame in reader:
        writer.append_data(frame)

    # Close the reader and writer
    reader.close()
    writer.close()


@router.post("/accounts/image")
async def upload_image(
    file: UploadFile = File(...),
) -> str:
    print("Received file:", file.filename)
    print("Content type:", file.content_type)

    try:
        contents = await file.read()
        key = file.filename

        # Check if the file is a .MOV video
        if file.content_type == "video/quicktime":
            print("Converting .mov to .mp4...")
            with NamedTemporaryFile(
                delete=False, suffix=".mov"
            ) as temp_input_file:
                temp_input_file.write(contents)
                temp_input_file.flush()  # Make sure the contents are written to the file

                with NamedTemporaryFile(
                    delete=False, suffix=".mp4"
                ) as temp_output_file:
                    convert_mov_to_mp4(
                        temp_input_file.name, temp_output_file.name
                    )  # Call the conversion function here

                    with open(temp_output_file.name, "rb") as f:
                        contents = f.read()

                key = key.replace(".MOV", ".mp4")

        content_type, _ = guess_type(key)
        print("Uploading the file to S3...")
        s3.put_object(
            Bucket=BUCKET_NAME,
            Key=key,
            Body=contents,
            ContentType=content_type,
            Metadata={
                "Content-Type": content_type,
            },
        )
        image_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{key}"
        return image_url
    except Exception as e:
        print("Error during conversion or upload:", str(e))  # Add this line
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOutWithPassword = Depends(
        authenticator.try_get_current_account_data
    ),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.get(
    "/accounts", response_model=Union[List[AccountOutWithPassword], Error]
)
def get_all(
    repo: AccountRepository = Depends(),
):
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


@router.put("/accounts/{id}", response_model=AccountUpdate)
def update(
    id: int, account: AccountUpdate, repo: AccountRepository = Depends()
) -> AccountIn:
    return repo.update(id, account)


@router.post("/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    response.set_cookie(
        key=authenticator.cookie_name,
        value=token.access_token,
        httponly=True,
        max_age=None,  # set session timeout to None
        samesite="strict",
    )
    return AccountToken(account=account, **token.dict())


@router.get("/api/things")
async def get_things(
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        return account_data["id"]

    pass
