from typing import List

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import ResourseNotFound
from app.domain.dto.comment import (
    CommentCreateDTO,
    CommentDTO,
    CommentUpdateDTO,
)
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

    async def update(self, comment: CommentUpdateDTO):
        """Update existing article."""
        db_comment = await self.session.scalar(
            select(Comment).where(Comment.id == comment.comment_id)
        )

        if db_comment is None or db_comment.author_id != comment.author_id:
            raise ResourseNotFound(
                f'Comment with id {comment.comment_id} not found for this user'
            )

        db_comment.content = comment.content
        db_comment.updated_at = func.now()

        try:
            await self.session.commit()
            await self.session.refresh(db_comment)
            return CommentDTO(
                id=db_comment.id,
                content=db_comment.content,
                author_id=db_comment.author_id,
                article_id=db_comment.article_id,
                created_at=db_comment.created_at,
                updated_at=db_comment.updated_at,
            )
        except Exception as e:
            await self.session.rollback()
            raise e

    async def delete(self, author_id: int, comment_id: int):
        """Delete existing article."""
        db_comment = await self.session.scalar(
            select(Comment).where(Comment.id == comment_id)
        )

        if db_comment is None or db_comment.author_id != author_id:
            raise ResourseNotFound(
                f'Comment with id {comment_id} not found for this user'
            )

        try:
            await self.session.delete(db_comment)
            await self.session.commit()
            return
        except Exception as e:
            await self.session.rollback()
            raise e
