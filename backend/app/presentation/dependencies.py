from typing import Annotated

from fastapi import Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.use_cases.get_me import GetMeUseCase
from app.config.db import get_session
from app.domain.dto.user import UserDTO
from app.domain.repositories import users


DbSession = Annotated[AsyncSession, Depends(get_session)]


def get_user_repository(session: DbSession):
    return users.UserRepository(session)


UserRepository = Annotated[users.UserRepository, Depends(get_user_repository)]


async def get_current_user(
        request: Request, user_repository: UserRepository) -> UserDTO:
    access_token = request.cookies.get("__access")
    use_case = GetMeUseCase(user_repository)
    return await use_case.execute(access_token)

CurrentUser = Annotated[UserDTO, Depends(get_current_user)]
