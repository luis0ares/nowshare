from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import ResourseNotFound
from app.domain.dto.article import ArticleCreateDTO, ArticleDTO
from app.domain.models import Article


class ArticleRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create_article(self, article: ArticleCreateDTO):
        """Create new article."""
        article: Article = Article(
            title=article.title,
            content=article.content,
            author_id=article.author_id
        )
        try:
            self.session.add(article)
            await self.session.commit()
            await self.session.refresh(article)
            return ArticleDTO(
                id=article.id,
                title=article.title,
                content=article.content,
                author_id=article.author_id,
                created_at=article.created_at,
                updated_at=article.updated_at
            )
        except Exception as e:
            await self.session.rollback()
            raise e

    async def get_article_by_id(self, article_id: int) -> ArticleDTO:
        """Get article by id."""
        article = await self.session.scalar(
            select(Article).where(Article.id == article_id))

        if article is None:
            raise ResourseNotFound(
                f'Article with id {article_id} not found')
        return ArticleDTO(
            id=article.id,
            title=article.title,
            content=article.content,
            author_id=article.author_id,
            created_at=article.created_at,
            updated_at=article.updated_at
        )

    async def get_articles(self):
        """Get all articles."""
        articles = await self.session.scalars(
            select(Article).order_by(Article.created_at.desc()))

        for article in articles:
            yield ArticleDTO(
                id=article.id,
                title=article.title,
                content=article.content,
                author_id=article.author_id,
                created_at=article.created_at,
                updated_at=article.updated_at
            )
