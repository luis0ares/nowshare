import jwt
from datetime import datetime, timedelta, timezone
from dataclasses import dataclass

from app.config.settings import envs


@dataclass
class ApiTokens:
    access: str
    refresh: str


def create_tokens(sub: str):
    utc_now = datetime.now(timezone.utc)

    access_payload = {
        "sub": sub,
        "type": "access",
        "exp": utc_now + timedelta(minutes=envs.ACCESS_TOKEN_EXPIRE_MINUTES),
    }
    access_token = jwt.encode(
        access_payload, envs.JWT_SECRET, algorithm=envs.JWT_ALGORITHM)

    refresh_payload = {
        "sub": sub,
        "type": "refresh",
        "exp": utc_now + timedelta(days=envs.REFRESH_TOKEN_EXPIRE_DAYS),
    }
    refresh_token = jwt.encode(
        refresh_payload, envs.JWT_SECRET, algorithm=envs.JWT_ALGORITHM)

    return ApiTokens(access=access_token, refresh=refresh_token)