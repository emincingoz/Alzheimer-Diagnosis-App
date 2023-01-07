from pydantic import BaseModel

class PredictionModel(BaseModel):
    name: str
    value: float
