export interface ROIData {
  frame_id: number;
  timestamp: number;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface VideoMetadata {
  video_id: string;
  created_at: string;
  frame_count: number;
} 