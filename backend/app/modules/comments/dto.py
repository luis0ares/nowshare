from dataclasses import dataclass
from datetime import datetime


@dataclass
class CommentCreateDTO:
    content: str
    author_id: int
    article_id: int


@dataclass
class CommentUpdateDTO:
    content: str


@dataclass
class CommentDTO:
    id: int
    content: str
    author_id: int
    article_id: int
    created_at: datetime
    updated_at: datetime | None
