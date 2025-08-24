from supabase import create_client, Client

from core.config import settings
from core.exception import UnauthorizedException

def get_admin_client() -> Client:
    admin_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)
    return admin_client


def get_user_client_from_token(token: str) -> Client:
    if not token:
        raise UnauthorizedException("Missing bearer token")
    client = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)
    
    client.postgrest.auth(token)
    return client