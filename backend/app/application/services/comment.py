from typing import List

from app.domain.dto.comment import (
    CommentCreateDTO,
    CommentDTO,
    CommentUpdateDTO,
)
from app.domain.repositories.comments import CommentRepository


class CommentService:
    def __init__(self, comment_repository: CommentRepository):
        self.comment_repository = comment_repository

    async def create_comment(
        self, article_id: int, content: str, author_id: int
    ) -> CommentDTO:
        comment = CommentCreateDTO(
            article_id=article_id, content=content, author_id=author_id
        )
        created_comment = await self.comment_repository.create(comment)
        return created_comment

    async def get_article_comments(self, article_id: int) -> List[CommentDTO]:
        return await self.comment_repository.get_all_by_article_id(article_id)

    async def update_comment(
        self, comment_id: int, content: str, author_id: int
    ) -> CommentDTO:
        comment = CommentUpdateDTO(
            comment_id=comment_id, author_id=author_id, content=content
        )
        updated_comment = await self.comment_repository.update(comment)
        return updated_comment

    async def delete_comment(self, author_id: int, comment_id: int):
        await self.comment_repository.delete(author_id, comment_id)
