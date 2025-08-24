from .base_response_model import BaseModel


class ErrorResponse(BaseModel):
    error_code: str
    message: str
    debug_info: str
