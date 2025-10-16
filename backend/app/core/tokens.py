from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Literal, TypedDict

import jwt

from app.config.settings import envs


@dataclass
class TokenData:
    value: str
    max_age: int
    exp: datetime


@dataclass
class ApiTokens:
    access: TokenData
    refresh: TokenData


class TokenPayload(TypedDict):
    sub: str
    type: Literal['access', 'refresh']


def create_tokens(sub: str):
    utc_now = datetime.now(timezone.utc)

    access_max_age = timedelta(minutes=envs.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_exp = utc_now + access_max_age
    access_payload = {
        'sub': sub,
        'type': 'access',
        'exp': access_exp,
    }
    access_token = jwt.encode(
        access_payload, envs.JWT_SECRET, algorithm=envs.JWT_ALGORITHM
    )

    refresh_max_age = timedelta(days=envs.REFRESH_TOKEN_EXPIRE_DAYS)
    refresh_exp = utc_now + refresh_max_age
    refresh_payload = {
        'sub': sub,
        'type': 'refresh',
        'exp': refresh_exp,
    }
    refresh_token = jwt.encode(
        refresh_payload, envs.JWT_SECRET, algorithm=envs.JWT_ALGORITHM
    )

    access = TokenData(value=access_token, exp=access_exp,
                       max_age=int(access_max_age.total_seconds()))
    refresh = TokenData(value=refresh_token, exp=refresh_exp,
                        max_age=int(refresh_max_age.total_seconds()))
    return ApiTokens(access=access, refresh=refresh)


def decode_token(token: str) -> TokenPayload:
    return jwt.decode(token, envs.JWT_SECRET, algorithms=[envs.JWT_ALGORITHM])
