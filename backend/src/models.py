from pydantic import BaseModel
from typing import Dict, Optional
from datetime import datetime

class ROIData(BaseModel):
    video_id: str
    frame_id: int
    timestamp: float
    bbox: Dict[str, float]  # x, y, width, height

class VideoMetadata(BaseModel):
    video_id: str
    created_at: datetime
    duration: Optional[float]
    frame_count: int 