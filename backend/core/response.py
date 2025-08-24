from fastapi import status
from fastapi.responses import JSONResponse

from schemas.error_response import ErrorResponse

public_api_responses = {
    400: {"model": ErrorResponse},
    401: {"model": ErrorResponse},
    403: {"model": ErrorResponse},
}


authenticated_api_responses = {
    400: {"model": ErrorResponse},
    401: {"model": ErrorResponse},
    403: {"model": ErrorResponse},
}


class BadRequestResponse(JSONResponse):
    def __init__(
        self, message=None, debug_info=None, error_code=status.HTTP_400_BAD_REQUEST
    ):
        custom_content = {
            "error_code": error_code,
            "message": message,
            "debug_info": debug_info,
        }
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST, content=custom_content
        )


class UnauthorizedResponse(JSONResponse):
    def __init__(self, message=None, debug_info=None):
        custom_content = {
            "error_code": status.HTTP_401_UNAUTHORIZED,
            "message": message,
            "debug_info": debug_info,
        }
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED, content=custom_content
        )


class AccessDeniedResponse(JSONResponse):
    def __init__(self, message=None, debug_info=None):
        custom_content = {
            "error_code": status.HTTP_403_FORBIDDEN,
            "message": message,
            "debug_info": debug_info,
        }
        super().__init__(status_code=status.HTTP_403_FORBIDDEN, content=custom_content)
