from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.config.db import get_session
from app.domain.repositories import users


DbSession = Annotated[AsyncSession, Depends(get_session)]


def get_user_repository(session: DbSession):
    return users.UserRepository(session)


UserRepository = Annotated[users.UserRepository, Depends(get_user_repository)]
