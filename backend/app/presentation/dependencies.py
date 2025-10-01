from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.config.db import get_session

DbSession = Annotated[AsyncSession, Depends(get_session)]
