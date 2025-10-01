from fastapi import APIRouter, Request, Response
from starlette.responses import RedirectResponse

from app.application.use_cases.oauth_github import GithubCallbackUseCase
from app.application.use_cases.refresh_token import RefreshTokenUseCase
from app.config.settings import envs
from app.domain.repositories.users import UserRepository
from app.presentation.api.schemas import Generic
from app.presentation.dependencies import DbSession

auth_router = APIRouter(prefix='/auth', tags=['OAuth'])


@auth_router.get('/github/login')
async def github_oauth_redirect():
    """
    Redirects the user to the GitHub login page, initiating the OAuth
    authentication flow.
    """
    URL = (
        'https://github.com/login/oauth/authorize?scope=user:email&'
        + f'client_id={envs.GITHUB_CLIENT_ID}&'
        + f'redirect_uri={envs.GITHUB_REDIRECT_URI}'
    )
    return RedirectResponse(URL)


@auth_router.get('/github/callback')
async def github_oauth_callback(
    response: Response, code: str, db_session: DbSession
):
    """
    GitHub OAuth callback route. Processes the received authorization
    code, authenticates the user, sets authentication cookies with the
    **httponly** flag, and redirects to the URL configured in the
    **LOGGED_REDIRECT** environment variable.
    """
    user_repository = UserRepository(db_session)
    use_case = GithubCallbackUseCase(user_repository)
    tokens = await use_case.execute(code)

    response = RedirectResponse(envs.LOGGED_REDIRECT)
    response.set_cookie(
        key='__access',
        value=tokens.access,
        httponly=True,
        secure=envs.C00KIES_SECURE,
        samesite='lax',
    )
    response.set_cookie(
        key='__refresh',
        value=tokens.refresh,
        httponly=True,
        secure=envs.C00KIES_SECURE,
        samesite='lax',
    )
    return response


@auth_router.get('/refresh', response_model=Generic)
def refresh_access_token(request: Request, response: Response):
    refresh_token = request.cookies.get('__refresh')
    use_case = RefreshTokenUseCase()
    tokens = use_case.execute(refresh_token)

    response.set_cookie(
        key='__access',
        value=tokens.access,
        httponly=True,
        secure=envs.C00KIES_SECURE,
        samesite='lax',
    )
    response.set_cookie(
        key='__refresh',
        value=tokens.refresh,
        httponly=True,
        secure=envs.C00KIES_SECURE,
        samesite='lax',
    )
    return Generic(detail='Tokens refreshed')


@auth_router.get('/logout', response_model=Generic)
def logout(response: Response):
    """Removes the **httponly** tokens."""
    response.delete_cookie('__access')
    response.delete_cookie('__refresh')
    return Generic(detail='Logged out')
