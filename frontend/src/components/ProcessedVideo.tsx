import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { videoApi } from '../services/api';
import { ROIData } from '../types';

interface Props {
  videoId: string;
}

const ProcessedVideo: React.FC<Props> = ({ videoId }) => {
  const [roiData, setRoiData] = useState<ROIData[]>([]);

  useEffect(() => {
    const loadROIData = async () => {
      try {
        const data = await videoApi.getROIData(videoId);
        setRoiData(data);
      } catch (err) {
        console.error('Failed to load ROI data:', err);
      }
    };

    if (videoId) {
      loadROIData();
    }
  }, [videoId]);

  return (
    <Container>
      <Video controls>
        <source src={videoApi.getVideoStreamUrl(videoId)} type="video/mp4" />
        Your browser does not support the video tag.
      </Video>
      <ROIDataContainer>
        <h3>Face Detection Data</h3>
        <DataList>
          {roiData.map((data, index) => (
            <DataItem key={index}>
              Frame {data.frame_id} - Position: ({data.bbox.x}, {data.bbox.y})
            </DataItem>
          ))}
        </DataList>
      </ROIDataContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Video = styled.video`
  width: 100%;
  max-width: 640px;
  border-radius: 8px;
`;

const ROIDataContainer = styled.div`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const DataList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
`;

const DataItem = styled.li`
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  font-size: 0.875rem;
`;

export default ProcessedVideo; 