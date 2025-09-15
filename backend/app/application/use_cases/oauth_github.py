from typing import TypedDict
from httpx import AsyncClient

from app.config.settings import envs
from app.core.tokens import create_tokens
from app.domain.dto.user import UserCreateUpdateDTO
from app.domain.repositories.users import UserRepository


class GithubUser(TypedDict):
    id: int
    avatar_url: str
    name: str


class GithubCallbackUseCase:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    async def _get_user_data(self, code: str) -> GithubUser:
        async with AsyncClient() as client:
            resp = await client.post(
                "https://github.com/login/oauth/access_token",
                data={
                    "client_id": envs.GITHUB_CLIENT_ID,
                    "client_secret": envs.GITHUB_CLIENT_SECRET,
                    "code": code,
                },
                headers={"Accept": "application/json"},
            )
            access_token = resp.json()["access_token"]

            user_resp = await client.get(
                "https://api.github.com/user",
                headers={"Authorization": f"Bearer {access_token}"}
            )
            return user_resp.json()
    
    async def execute(self, code: str):
        github_user = await self._get_user_data(code)

        user = UserCreateUpdateDTO(
            sub=str(github_user['id']),
            avatar_url=github_user["avatar_url"],
            username=github_user['name']
        )
        user = await self.user_repository.create_or_update(user)

        return create_tokens(user.sub)
        
