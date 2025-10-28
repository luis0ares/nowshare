from taskiq.serializers.json_serializer import JSONSerializer
from taskiq_pg import AsyncpgBroker, AsyncpgResultBackend

from app.config.settings import envs
from app.config.db import generate_snowflake_id


def gen_str_snowflake_id(): return str(generate_snowflake_id())


result_backend = AsyncpgResultBackend(
    dsn=envs.DATABASE_URL.to_sync(),
    serializer=JSONSerializer(),
)

broker = (
    AsyncpgBroker(dsn=envs.DATABASE_URL.to_sync())
    .with_result_backend(result_backend)
    .with_id_generator(gen_str_snowflake_id)
)
