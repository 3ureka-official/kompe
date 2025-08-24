import enum
from datetime import datetime
from zoneinfo import ZoneInfo

from pydantic import BaseModel as PydanticBaseModel
from pydantic import ConfigDict


class SortOrder(str, enum.Enum):
    ASC = "ASC"
    DESC = "DESC"


def datetime_to_gmt_str(dt: datetime) -> str:
    if not dt.tzinfo:
        dt = dt.replace(tzinfo=ZoneInfo("UTC"))

    return dt.isoformat()


class BaseModel(PydanticBaseModel):
    model_config = ConfigDict(
        json_encoders={datetime: datetime_to_gmt_str},
        populate_by_name=True,
    )
