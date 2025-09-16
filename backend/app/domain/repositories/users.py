from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import ResourseNotFound
from app.domain.models import User
from app.domain.dto.user import UserDTO
from app.domain.dto.user import UserCreateUpdateDTO


class UserRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create_or_update(self, user: UserCreateUpdateDTO):
        """Create or update user."""
        existing_user = await self.session.scalar(
            select(User).where(User.sub == user.sub))

        try:
            if existing_user:
                existing_user.sub = user.sub
                existing_user.username = user.username
                existing_user.avatar_url = user.avatar_url
                await self.session.commit()
                await self.session.refresh(existing_user)
                return existing_user

            user_db = User(
                sub=user.sub,
                username=user.username,
                avatar_url=user.avatar_url
            )
            self.session.add(user_db)
            await self.session.commit()
            await self.session.refresh(user_db)
            return user_db
        except Exception as err:
            await self.session.rollback()
            raise err

    async def get_user_by_sub(self, user_sub: str) -> UserDTO | None:
        """Get user by sub."""
        user = await self.session.scalar(
            select(User).where(User.sub == user_sub))

        if not user:
            raise ResourseNotFound(f'User with sub {user_sub} not found')
        return UserDTO(
            id=user.id,
            sub=user.sub,
            username=user.username,
            avatar_url=user.avatar_url,
            created_at=user.created_at,
            updated_at=user.updated_at
        )
