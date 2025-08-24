from typing import List, Literal, Optional
from pydantic import BaseModel, Field, conint

class PayoutCreatorRequest(BaseModel):
    creator_id: str = Field(..., description="受取クリエイターのID（creators.id または users.id と対応）")
    amount_yen: conint(ge=1) = Field(..., description="整数JPY")
    reason: Literal["upload_reward", "rank_prize", "manual", "bonus", "guarantee"] = "upload_reward"
    payout_version: Optional[str] = Field(
        default=None,
        description="冪等性のバージョン識別子（同じ入力での二重送金防止に使用）",
    )
    application_ids: Optional[List[str]] = Field(
        default=None,
        description="（任意）この送金で支払い済みにしたい応募レコードID群",
    )