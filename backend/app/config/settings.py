from typing import List, Literal

from pydantic_settings import BaseSettings, SettingsConfigDict

EnvType = Literal['PROD', 'DEV', 'TEST']


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file='.env',
        env_ignore_empty=True,
        env_file_encoding='utf-8',
        extra='ignore',
    )

    LOG_LEVEL: str = 'INFO'
    # https://docs.python.org/3/library/logging.html#logrecord-attributes
    # 'request_id' is an unique id generated for each request
    LOG_FORMAT: str = '[%(asctime)s] |%(levelname)s| [%(filename)s] > %(request_id)s >> %(message)s'

    API_PREFIX: str = '/api'
    INSTANCE_ID: int = 1
    ENVIRONMENT: EnvType = 'PROD'

    CORS_ORIGINS: List[str] = ['*']
    CORS_HEADERS: List[str] = ['*']
    CORS_METHODS: List[str] = ['*']

    DATABASE_URL: str
    DATABASE_ECHO: bool = False

    JWT_ALGORITHM: str = 'HS256'
    JWT_SECRET: str = 'my-jwt-secret'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    GITHUB_CLIENT_ID: str
    GITHUB_CLIENT_SECRET: str
    GITHUB_REDIRECT_URI: str
    LOGGED_REDIRECT: str = '/'
    C00KIES_SECURE: bool = False


envs = Settings()
