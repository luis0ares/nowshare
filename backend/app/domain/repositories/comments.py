from typing import List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.dto.comment import CommentCreateDTO, CommentDTO
from app.domain.models import Comment


class CommentRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, comment: CommentCreateDTO):
        """Create new comment."""
        comment: Comment = Comment(
            content=comment.content,
            author_id=comment.author_id,
            article_id=comment.article_id,
        )
        try:
            self.session.add(comment)
            await self.session.commit()
            await self.session.refresh(comment)
            return CommentDTO(
                id=comment.id,
                content=comment.content,
                author_id=comment.author_id,
                article_id=comment.article_id,
                created_at=comment.created_at,
                updated_at=comment.updated_at,
            )
        except Exception as e:
            await self.session.rollback()
            raise e

    async def get_all_by_article_id(self, article_id: int) -> List[CommentDTO]:
        """Get all comments."""
        comments = await self.session.scalars(
            select(Comment)
            .where(Comment.article_id == article_id)
            .order_by(Comment.created_at.desc())
        )

        return [
            CommentDTO(
                id=comment.id,
                content=comment.content,
                author_id=comment.author_id,
                article_id=comment.article_id,
                created_at=comment.created_at,
                updated_at=comment.updated_at,
            )
            for comment in comments
        ]
