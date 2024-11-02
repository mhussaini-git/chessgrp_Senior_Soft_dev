import React, { useState } from 'react';
import styled from 'styled-components';
import VideoRecorder from './components/VideoRecorder';
import ProcessedVideo from './components/ProcessedVideo';

const App: React.FC = () => {
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

  return (
    <Container>
      <Header>Video Face Detection</Header>
      <Main>
        <Section>
          <h2>Record Video</h2>
          <VideoRecorder onVideoUploaded={setCurrentVideoId} />
        </Section>
        {currentVideoId && (
          <Section>
            <h2>Processed Video</h2>
            <ProcessedVideo videoId={currentVideoId} />
          </Section>
        )}
      </Main>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Section = styled.section`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;

export default App; 