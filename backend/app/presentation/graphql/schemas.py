import strawberry
from datetime import datetime
from strawberry.fastapi import GraphQLRouter
from typing import List

from app.application.services.article import ArticleService
from app.application.services.comment import CommentService
from app.application.use_cases.get_author import GetAuthorByIdUseCase
from app.domain.repositories.articles import ArticleRepository
from app.domain.repositories.comments import CommentRepository
from app.domain.repositories.users import UserRepository
from app.presentation.graphql.context import (
    TypedInfo,
    get_context,
    get_current_user,
)


@strawberry.type
class UserType:
    id: str
    username: str
    avatar_url: str


@strawberry.type
class CommentType:
    id: str
    content: str
    author_id: int

    @strawberry.field
    async def author(self, info: TypedInfo) -> UserType:
        user_repository = UserRepository(info.context['db_session'])
        use_case = GetAuthorByIdUseCase(user_repository)
        return await use_case.execute(int(self.author_id))


@strawberry.type
class ArticleType:
    id: str
    title: str
    content: str
    author_id: str
    created_at: datetime
    updated_at: datetime | None

    @strawberry.field
    async def author(self, info: TypedInfo) -> UserType:
        user_repository = UserRepository(info.context['db_session'])
        use_case = GetAuthorByIdUseCase(user_repository)
        return await use_case.execute(int(self.author_id))

    @strawberry.field
    async def comments(self, info: TypedInfo) -> List[CommentType]:
        comment_repository = CommentRepository(info.context['db_session'])
        service = CommentService(comment_repository)
        return await service.get_article_comments(self.id)


# Queries
@strawberry.type
class Query:
    @strawberry.field
    async def me(self, info: TypedInfo) -> UserType:
        user_data = await get_current_user(info.context)
        return user_data

    @strawberry.field
    async def article(self, info: TypedInfo, id: str) -> ArticleType:
        article_repository = ArticleRepository(info.context['db_session'])
        service = ArticleService(article_repository)
        return await service.get_article(int(id))

    @strawberry.field
    async def articles(
        self, info: TypedInfo, author_id: str | None = None
    ) -> List[ArticleType]:
        author_id = int(author_id) if author_id is not None else None
        article_repository = ArticleRepository(info.context['db_session'])
        service = ArticleService(article_repository)
        return await service.get_articles(author_id)


# Mutations
@strawberry.type
class Mutation:
    @strawberry.mutation
    async def create_article(
        self, title: str, content: str, info: TypedInfo
    ) -> ArticleType:
        # get current authenticated user - auth required
        user_data = await get_current_user(info.context)

        article_repository = ArticleRepository(info.context['db_session'])

        service = ArticleService(article_repository)
        article = await service.create_article(
            title=title, content=content, author_id=user_data.id
        )
        return article

    @strawberry.mutation
    async def update_article(
        self, article_id: str, title: str, content: str, info: TypedInfo
    ) -> ArticleType:
        # get current authenticated user - auth required
        author = await get_current_user(info.context)

        article_repository = ArticleRepository(info.context['db_session'])

        service = ArticleService(article_repository)
        article = await service.update_article(
            author_id=author.id,
            article_id=int(article_id),
            title=title,
            content=content,
        )
        return article

    @strawberry.mutation
    async def delete_article(self, article_id: str, info: TypedInfo) -> None:
        # get current authenticated user - auth required
        author = await get_current_user(info.context)

        article_repository = ArticleRepository(info.context['db_session'])

        service = ArticleService(article_repository)
        await service.delete_article(
            author_id=author.id, article_id=int(article_id)
        )

    @strawberry.mutation
    async def create_article_comment(
        self, article_id: str, content: str, info: TypedInfo
    ) -> CommentType:
        # get current authenticated user - auth required
        user_data = await get_current_user(info.context)

        comment_repository = CommentRepository(info.context['db_session'])
        service = CommentService(comment_repository)
        return await service.create_comment(
            int(article_id), content, user_data.id
        )


schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(
    schema,
    context_getter=get_context,
    graphql_ide='apollo-sandbox',
    path='/graphql',
    tags=['Graphql'],
)
