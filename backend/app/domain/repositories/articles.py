from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import ResourseNotFound
from app.domain.dto.article import ArticleCreateDTO, ArticleDTO, ArticleUpdateDTO
from app.domain.models import Article


class ArticleRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, article: ArticleCreateDTO):
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

    async def update(self, author_id: int, article_id: int, 
                     article: ArticleUpdateDTO):
        """Update existing article."""
        db_article = await self.session.scalar(
            select(Article).where(Article.id == article_id))

        if db_article is None or db_article.author_id != author_id:
            raise ResourseNotFound(
                f'Article with id {article_id} not found for this user')

        db_article.title = article.title
        db_article.content = article.content
        db_article.updated_at = func.now()

        try:
            await self.session.commit()
            await self.session.refresh(db_article)
            return ArticleDTO(
                id=db_article.id,
                title=db_article.title,
                content=db_article.content,
                author_id=db_article.author_id,
                created_at=db_article.created_at,
                updated_at=db_article.updated_at
            )
        except Exception as e:
            await self.session.rollback()
            raise e

    async def delete(self, author_id: int, article_id: int):
        """Delete existing article."""
        db_article = await self.session.scalar(
            select(Article).where(Article.id == article_id))

        if db_article is None or db_article.author_id != author_id:
            raise ResourseNotFound(
                f'Article with id {article_id} not found for this user')

        try:
            await self.session.delete(db_article)
            await self.session.commit()
            return 
        except Exception as e:
            await self.session.rollback()
            raise e

    async def get_by_id(self, article_id: int) -> ArticleDTO:
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

    async def get_all(self, author_id: int | None = None):
        """Get all articles."""
        stmt = select(Article).order_by(Article.created_at.desc())
        if author_id is not None:
            stmt = stmt.where(Article.author_id == author_id)
        articles = await self.session.scalars(stmt)

        return [
            ArticleDTO(
                id=article.id,
                title=article.title,
                content=article.content,
                author_id=article.author_id,
                created_at=article.created_at,
                updated_at=article.updated_at
            ) for article in articles
        ]
