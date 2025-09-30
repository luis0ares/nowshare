from dataclasses import dataclass
from datetime import datetime


@dataclass
class CommentCreateDTO:
    content: str
    author_id: int
    article_id: int


@dataclass
class CommentUpdateDTO:
    comment_id: int
    author_id: int
    content: str


@dataclass
class CommentDTO:
    id: int
    content: str
    author_id: int
    article_id: int
    created_at: datetime
    updated_at: datetime | None
