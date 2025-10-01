from dataclasses import dataclass
from datetime import datetime


@dataclass
class UserCreateUpdateDTO:
    sub: str
    username: str
    avatar_url: str


@dataclass
class UserDTO:
    id: int
    sub: str
    username: str
    avatar_url: str
    created_at: datetime
    updated_at: datetime | None
