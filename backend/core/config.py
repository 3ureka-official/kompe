from typing import Any, Dict, Optional

from pydantic import validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Supabase config
    SUPABASE_URL: Optional[str]
    SUPABASE_ANON_KEY: Optional[str]
    SUPABASE_SERVICE_ROLE_KEY: Optional[str]

    @validator("SUPABASE_URL", pre=True)
    def check_supabase_url(cls, v: Optional[str]) -> str:
        if not v:
            raise ValueError("SUPABASE_URL is required")
        return v

    @validator("SUPABASE_ANON_KEY", pre=True)
    def check_supabase_anon_key(cls, v: Optional[str]) -> str:
        if not v:
            raise ValueError("SUPABASE_ANON_KEY is required")
        return v

    @validator("SUPABASE_SERVICE_ROLE_KEY", pre=True)
    def check_supabase_service_role_key(cls, v: Optional[str]) -> str:
        if not v:
            raise ValueError("SUPABASE_SERVICE_ROLE_KEY is required")
        return v


    class Config:
        case_sensitive = True
        env_file = "backend/.env"
        env_file_encoding = "utf-8"


settings = Settings()
