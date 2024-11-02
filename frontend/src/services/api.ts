import axios from 'axios';
import { VideoMetadata, ROIData } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

export const videoApi = {
  uploadVideo: async (videoBlob: Blob): Promise<VideoMetadata> => {
    const formData = new FormData();
    formData.append('video', videoBlob);

    const response = await axios.post<VideoMetadata>(
      `${API_BASE_URL}/video/upload`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  },

  getROIData: async (videoId: string): Promise<ROIData[]> => {
    const response = await axios.get<ROIData[]>(
      `${API_BASE_URL}/video/roi/${videoId}`
    );
    return response.data;
  },

  getVideoStreamUrl: (videoId: string): string => {
    return `${API_BASE_URL}/video/stream/${videoId}`;
  }
}; 