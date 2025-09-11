from httpx import AsyncClient


async def test_ab(async_client: AsyncClient):
    # Arrange & Act
    response = await async_client.get('/')

    # Assert
    assert response.status_code == 200, \
        f"Expected status code 201, but got {response.status_code}"
