from typing import Any, TypedDict
from fastapi import Request
from strawberry import Info
from sqlalchemy.ext.asyncio import AsyncSession


from app.application.use_cases.get_me import GetMeUseCase
from app.domain.dto.user import UserDTO
from app.domain.repositories.users import UserRepository
from app.presentation.dependencies import DbSession


class Context(TypedDict):
    request: Request
    db_session: AsyncSession


TypedInfo = Info[Context, Any]


def get_context(request: Request, session: DbSession) -> Context:
    return Context(request=request, db_session=session)


async def get_current_user(context: Context) -> UserDTO:
    access_token = context['request'].cookies.get('__access')
    user_repository = UserRepository(context['db_session'])

    use_case = GetMeUseCase(user_repository)
    return await use_case.execute(access_token)
