from datetime import datetime
from typing import List, Optional

from sqlalchemy import BigInteger, ForeignKey, String, Text, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

from app.db.database import generate_snowflake_id


class BaseMixin:
    id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        default=generate_snowflake_id,
    )

    created_at: Mapped[datetime] = mapped_column(
        default=func.now(), nullable=False
    )
    updated_at: Mapped[Optional[datetime]] = mapped_column(
        onupdate=func.now(), nullable=True
    )


class Base(DeclarativeBase):
    ...


class User(BaseMixin, Base):
    __tablename__ = "users"

    sub: Mapped[str] = mapped_column(
        String(100), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False)
    avatar_url: Mapped[Optional[str]] = mapped_column(
        String(255), nullable=True)

    # Relationships
    articles: Mapped[List["Article"]] = relationship(back_populates="author")


class Article(BaseMixin, Base):
    __tablename__ = "articles"

    title: Mapped[str] = mapped_column(String(200), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)

    author_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), nullable=False)

    # Relationships
    author: Mapped["User"] = relationship(back_populates="articles")
    comments: Mapped[List["Comment"]] = relationship(back_populates="article")


class Comment(BaseMixin, Base):
    __tablename__ = "comments"

    content: Mapped[str] = mapped_column(Text, nullable=False)

    author_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), nullable=False)
    article_id: Mapped[int] = mapped_column(
        ForeignKey("articles.id"), nullable=False)

    # Relationships
    author: Mapped["User"] = relationship(back_populates="comments")
    article: Mapped["Article"] = relationship(back_populates="comments")
