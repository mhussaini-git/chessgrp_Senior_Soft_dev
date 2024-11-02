from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from typing import List
import io
from ..models import ROIData, VideoMetadata
from ..database import Database
from ..video_processor import VideoProcessor
import uuid
from datetime import datetime
from PIL import Image

router = APIRouter()
video_processor = VideoProcessor()

@router.post("/upload", response_model=VideoMetadata)
async def upload_video(video: UploadFile = File(...)):
    if not video.content_type.startswith('video/'):
        raise HTTPException(400, "File must be a video")

    video_id = str(uuid.uuid4())
    db = Database.get_db()
    
    # Read and process video frames
    contents = await video.read()
    frames = extract_frames(contents)  # You'll need to implement this
    
    roi_data = []
    processed_frames = []
    
    for frame_id, (frame, timestamp) in enumerate(frames):
        processed_frame, roi = video_processor.process_frame(frame, frame_id, timestamp)
        if roi:
            roi['video_id'] = video_id
            roi_data.append(roi)
        processed_frames.append(processed_frame)

    # Store ROI data
    if roi_data:
        await db.roi_data.insert_many(roi_data)

    # Store processed video
    video_metadata = VideoMetadata(
        video_id=video_id,
        created_at=datetime.utcnow(),
        frame_count=len(processed_frames)
    )
    await db.videos.insert_one(video_metadata.dict())

    # Save processed video frames
    await save_processed_video(video_id, processed_frames)  # You'll need to implement this

    return video_metadata

@router.get("/stream/{video_id}")
async def stream_video(video_id: str):
    db = Database.get_db()
    video = await db.videos.find_one({"video_id": video_id})
    
    if not video:
        raise HTTPException(404, "Video not found")

    def video_generator():
        # Implement video streaming here
        pass

    return StreamingResponse(
        video_generator(),
        media_type="video/mp4"
    )

@router.get("/roi/{video_id}", response_model=List[ROIData])
async def get_roi_data(video_id: str):
    db = Database.get_db()
    roi_data = await db.roi_data.find({"video_id": video_id}).to_list(None)
    
    if not roi_data:
        raise HTTPException(404, "ROI data not found")
    
    return roi_data 