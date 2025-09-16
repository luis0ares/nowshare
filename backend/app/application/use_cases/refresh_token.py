import jwt
from fastapi import HTTPException, status

from app.core.tokens import create_tokens, decode_token


class RefreshTokenUseCase:
    def execute(self, refresh_token: str | None):
        if not refresh_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authenticated",
            )

        try:
            payload = decode_token(refresh_token)
            if payload.get('type') != 'refresh':
                raise jwt.InvalidTokenError()
        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired",
            )
        except jwt.InvalidTokenError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
            )

        user_sub = payload.get("sub")
        return create_tokens(user_sub)
