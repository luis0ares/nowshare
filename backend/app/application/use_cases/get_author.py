from app.domain.repositories.users import UserRepository


class GetAuthorByIdUseCase:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    async def execute(self, author_id: int):
        return await self.user_repository.get_user_by_id(author_id)
