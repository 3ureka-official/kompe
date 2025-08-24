import os

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from api.api_v1.api import api_router
from core.exception import (
    AccessDeniedException,
    BadRequestException,
    UnauthorizedException,
)
from core.response import (
    AccessDeniedResponse,
    BadRequestResponse,
    UnauthorizedResponse,
)

load_dotenv()

frontend_origins = os.getenv("FRONTEND_ORIGINS", "")
combined_origins = {
    origin.strip() for origin in frontend_origins.split(",") if origin.strip()
}

app = FastAPI(title="Kompe Payout Service", openapi_url="/api/v1/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(combined_origins),
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["content-disposition"],
)

# フォーマットエラー
@app.exception_handler(BadRequestException)
def bad_request_exception_handler(request: Request, exc: BadRequestException):
    # BadRequestResponse 側の引数に合わせて必要なら調整
    return BadRequestResponse(exc.message, getattr(exc, "debug_info", None), getattr(exc, "error_code", None))

# 認証エラー
@app.exception_handler(UnauthorizedException)
def unauthorized_exception_handler(request: Request, exc: UnauthorizedException):
    return UnauthorizedResponse(exc.message, getattr(exc, "debug_info", None))

# 認可エラー
@app.exception_handler(AccessDeniedException)
def access_denied_exception_handler(request: Request, exc: AccessDeniedException):
    return AccessDeniedResponse(exc.message, getattr(exc, "debug_info", None))

app.include_router(api_router, prefix="/api/v1")