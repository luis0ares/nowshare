from fastapi import APIRouter, Response
from starlette.responses import RedirectResponse

from app.application.use_cases.oauth_github import GithubCallbackUseCase
from app.config.settings import envs
from app.presentation.dependencies import UserRepository


auth_router = APIRouter(prefix="/auth", tags=["OAuth"])


@auth_router.get("/github/login")
async def github_oauth_redirect():
    """
    Redirects the user to the GitHub login page, initiating the OAuth 
    authentication flow.
    """
    URL = 'https://github.com/login/oauth/authorize?scope=user:email&' + \
        f'client_id={envs.GITHUB_CLIENT_ID}&' + \
        f'redirect_uri={envs.GITHUB_REDIRECT_URI}'
    return RedirectResponse(URL)


@auth_router.get("/github/callback")
async def github_oauth_callback(response: Response, code: str,
                                user_repository: UserRepository):
    """
    GitHub OAuth callback route. Processes the received authorization 
    code, authenticates the user, sets authentication cookies with the 
    httponly flag, and redirects to the URL configured in the 
    **LOGGED_REDIRECT** environment variable.
    """
    use_case = GithubCallbackUseCase(response, user_repository)
    return await use_case.execute(code)



