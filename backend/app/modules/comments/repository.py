from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import ResourseNotFound
from app.db.models import Comment
from app.modules.comments.dto import CommentDTO
from app.modules.comments.dto import CommentCreateDTO


class CommentRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create_comment(self, comment: CommentCreateDTO):
        """Create new comment."""
        comment: Comment = Comment(
            content=comment.content,
            author_id=comment.author_id,
            article_id=comment.article_id
        )
        try:
            self.session.add(comment)
            await self.session.commit()
            await self.session.refresh(comment)
            return CommentDTO(
                id=comment.id,
                external_id=comment.external_id,
                content=comment.content,
                author_id=comment.author_id,
                article_id=comment.article_id,
                created_at=comment.created_at,
                updated_at=comment.updated_at
            )
        except Exception as e:
            await self.session.rollback()
            raise e

    async def get_comment_by_id(self, comment_external_id: int) -> CommentDTO:
        """Get comment by id."""
        comment = await self.session.scalar(
            select(Comment).where(Comment.external_id == comment_external_id))

        if comment is None:
            raise ResourseNotFound(
                f'Comment with id {comment_external_id} not found')
        return CommentDTO(
            id=comment.id,
            external_id=comment.external_id,
            content=comment.content,
            author_id=comment.author_id,
            article_id=comment.article_id,
            created_at=comment.created_at,
            updated_at=comment.updated_at
        )

    async def get_comments(self):
        """Get all comments."""
        comments = await self.session.scalars(
            select(Comment).order_by(Comment.created_at.desc()))

        for comment in comments:
            yield CommentDTO(
                id=comment.id,
                external_id=comment.external_id,
                content=comment.content,
                author_id=comment.author_id,
                article_id=comment.article_id,
                created_at=comment.created_at,
                updated_at=comment.updated_at
            )