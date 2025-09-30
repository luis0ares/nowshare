from typing import List

from app.domain.dto.article import (
    ArticleCreateDTO,
    ArticleDTO,
    ArticleUpdateDTO,
)
from app.domain.repositories.articles import ArticleRepository


class ArticleService:
    def __init__(self, article_repository: ArticleRepository):
        self.article_repository = article_repository

    async def create_article(
        self, title: str, content: str, author_id: int
    ) -> ArticleDTO:
        article = ArticleCreateDTO(
            title=title, content=content, author_id=author_id
        )
        created_article = await self.article_repository.create(article)
        return created_article

    async def update_article(
        self, author_id: int, article_id: int, title: str, content: str
    ) -> ArticleDTO:
        article = ArticleUpdateDTO(title=title, content=content)
        updated_article = await self.article_repository.update(
            author_id, article_id, article
        )
        return updated_article

    async def delete_article(self, author_id: int, article_id: int):
        await self.article_repository.delete(author_id, article_id)

    async def get_articles(
        self, author_id: int | None = None
    ) -> List[ArticleDTO]:
        return await self.article_repository.get_all(author_id)

    async def get_article(self, article_id: int) -> ArticleDTO:
        return await self.article_repository.get_by_id(article_id)
