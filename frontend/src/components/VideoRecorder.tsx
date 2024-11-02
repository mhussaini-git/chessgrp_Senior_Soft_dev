import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useWebcam } from '../hooks/useWebcam';
import { videoApi } from '../services/api';

interface Props {
  onVideoUploaded: (videoId: string) => void;
}

const VideoRecorder: React.FC<Props> = ({ onVideoUploaded }) => {
  const { isRecording, startRecording, stopRecording, videoRef, error } = useWebcam();

  const handleStopRecording = useCallback(async () => {
    try {
      const videoBlob = await stopRecording();
      const response = await videoApi.uploadVideo(videoBlob);
      onVideoUploaded(response.video_id);
    } catch (err) {
      console.error('Failed to process video:', err);
    }
  }, [stopRecording, onVideoUploaded]);

  return (
    <Container>
      <VideoPreview ref={videoRef} autoPlay muted />
      <Controls>
        {!isRecording ? (
          <Button onClick={startRecording}>Start Recording</Button>
        ) : (
          <Button onClick={handleStopRecording}>Stop Recording</Button>
        )}
      </Controls>
      {error && <Error>{error}</Error>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const VideoPreview = styled.video`
  width: 100%;
  max-width: 640px;
  border-radius: 8px;
  background-color: #000;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: #0070f3;
  color: white;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0051a2;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 0.875rem;
`;

export default VideoRecorder; 