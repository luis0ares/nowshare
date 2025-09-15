from dataclasses import dataclass
from datetime import datetime


@dataclass
class ArticleCreateDTO:
    title: str
    content: str
    author_id: int


@dataclass
class ArticleUpdateDTO:
    title: str
    content: str


@dataclass
class ArticleDTO:
    id: int
    title: str
    content: str
    author_id: int
    created_at: datetime
    updated_at: datetime | None
