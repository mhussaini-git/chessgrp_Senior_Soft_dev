import mediapipe as mp
from PIL import Image, ImageDraw
import numpy as np
from typing import Tuple, Optional
import io

class VideoProcessor:
    def __init__(self):
        self.face_detection = mp.solutions.face_detection.FaceDetection(
            min_detection_confidence=0.5
        )

    def process_frame(
        self, frame: Image.Image, frame_id: int, timestamp: float
    ) -> Tuple[Image.Image, Optional[dict]]:
        # Convert PIL Image to RGB
        rgb_frame = frame.convert('RGB')
        np_frame = np.array(rgb_frame)

        # Detect face
        results = self.face_detection.process(np_frame)
        
        if not results.detections:
            return frame, None

        # Get first face detection
        detection = results.detections[0]
        bbox = detection.location_data.relative_bounding_box

        # Convert relative coordinates to absolute
        frame_width, frame_height = frame.size
        x = int(bbox.xmin * frame_width)
        y = int(bbox.ymin * frame_height)
        width = int(bbox.width * frame_width)
        height = int(bbox.height * frame_height)

        # Draw rectangle
        draw = ImageDraw.Draw(frame)
        draw.rectangle(
            [(x, y), (x + width, y + height)],
            outline='red',
            width=2
        )

        # Create ROI data
        roi_data = {
            'frame_id': frame_id,
            'timestamp': timestamp,
            'bbox': {
                'x': x,
                'y': y,
                'width': width,
                'height': height
            }
        }

        return frame, roi_data

    def frame_to_bytes(self, frame: Image.Image) -> bytes:
        img_byte_arr = io.BytesIO()
        frame.save(img_byte_arr, format='JPEG')
        return img_byte_arr.getvalue() 