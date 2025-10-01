from httpx import AsyncClient


async def test_docs(async_client: AsyncClient):
    # Arrange & Act
    response = await async_client.get('/docs')

    # Assert
    assert response.status_code == 200, (
        f'Expected status code 200, but got {response.status_code}'
    )
