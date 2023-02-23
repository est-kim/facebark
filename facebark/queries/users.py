# from pydantic import BaseModel
# from typing import Optional
# from queries.pool import pool


# class DuplicateAccountError(ValueError):
#     pass


# class UserIn(BaseModel):
#     username: str
#     password: str


# class UserOut(BaseModel):
#     id: int
#     username: str


# class UserOutWithPassword(UserOut):
#     password: str


# class UsersOut(BaseModel):
#     users: list(UserOut)


# class UserQueries:
#     def get(self, username: str) -> UserOutWithPassword:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     result = db.execute(
#                         """
#                             SELECT id
#                             , username
#                             , password
#                             FROM accounts
#                             WHERE username = %s
#                         """,
#                         [username],
#                     )
#                     record = result.fetchone()
#                     if record is None:
#                         return None
#                     return self.record_to_account_out(record)
#         except Exception:
#             return {"message": "Could not get account"}

#     def get_user(self, id) -> Optional[UserOut]:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     db.execute(
#                         """
#                         SELECT id, username
#                         FROM accounts
#                         WHERE id = %s
#                     """,
#                         [id],
#                     )

#                     record = None
#                     row = db.fetchone()
#                     if row is not None:
#                         record = {}
#                         for i, column in enumerate(db.description):
#                             record[column.name] = row[i]
#                     if record is None:
#                         return None
#                     return record
#         except Exception:
#             return {"message": "Could not get that user"}
