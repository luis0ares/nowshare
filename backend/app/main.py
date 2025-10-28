from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from taskiq_fastapi import init as taskiq_fastapi_init

from app.broker import broker
from app.config.middleware import register_middleware
from app.config.settings import envs
from app.presentation.api.oauth import auth_router
from app.presentation.graphql.schemas import graphql_app
from app.presentation.handlers import register_handlers


@asynccontextmanager
async def lifespan(app: FastAPI):
    if not broker.is_worker_process:
        await broker.startup()
    taskiq_fastapi_init(broker, "app.main:app")

    yield

    if not broker.is_worker_process:
        await broker.shutdown()


app = FastAPI(
    title='NowShare API',
    description='Simple knowledge share platform built with FastAPI and Strawberry',
    version='0.1.0',
    contact={
        'name': 'Luis Eduardo Soares',
        'url': 'https:www,.luis0ares',
        'email': 'luisedu.soares@outlook.com',
    },
    docs_url=None,
    redoc_url='/docs',
    root_path=envs.API_PREFIX,
    lifespan=lifespan,
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=envs.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=envs.CORS_METHODS,
    allow_headers=envs.CORS_HEADERS,
)
# Logging middlewares
register_middleware(app)
# Register exception handlers
register_handlers(app)
# REST Routes
app.include_router(auth_router)
# Graphql Route
app.include_router(graphql_app)
