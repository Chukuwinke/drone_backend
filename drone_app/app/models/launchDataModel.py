from pydantic import BaseModel

class LaunchData(BaseModel):
    target: str
    missionKey: str