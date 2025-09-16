from pydantic import BaseModel


class UserData(BaseModel):
    id: str
    username: str
    avatar_url: str

class Generic(BaseModel):
    detail: str