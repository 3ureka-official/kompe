from pydantic import BaseModel, Field

class PayoutCreatorResponse(BaseModel):
    ok: bool = True
    transfer_id: str = Field(..., description="Stripe transfer id (tr_...)")
    amount_yen: int
    currency: str = "jpy"