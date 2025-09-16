import strawberry
from datetime import datetime
from strawberry.fastapi import GraphQLRouter
from strawberry.types import Info
from typing import List

from app.domain.dto.article import ArticleDTO
from app.domain.dto.user import UserDTO
from app.presentation.dependencies import CurrentUser


@strawberry.type
class UserType:
    id: str
    username: str
    avatar_url: str


@strawberry.type
class CommentType:
    id: str
    content: str
    author: UserType


@strawberry.type
class ArticleType:
    id: str
    title: str
    content: str
    author: UserType
    # comments: List[CommentType]


# Queries
@strawberry.type
class Query:
    @strawberry.field
    async def me(self, info: Info) -> UserType:
        user_data: UserDTO = info.context["current_user"]
        return user_data

    @strawberry.field
    async def articles(self, info: Info) -> List[ArticleType]:
        return [
            ArticleDTO(
                id=123,
                title='title',
                content='content',
                author_id=123,
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
        ]


# Mutations
@strawberry.type
class Mutation:
    @strawberry.mutation
    async def create_article(
            self, title: str, content: str, info: Info) -> ArticleType:
        user_data: UserDTO = info.context["current_user"]
        article = ArticleDTO(
            id=123,
            title=title,
            content=content,
            author_id=user_data.id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        return article


async def get_context_dependency(current_user: CurrentUser):
    return {"current_user": current_user}

schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(
    schema, context_getter=get_context_dependency,
    graphql_ide="apollo-sandbox", path="/graphql", tags=["Graphql"])
