Here's a detailed README.md for your project:

```markdown:README.md
# Video Face Detection Application

A full-stack application that performs real-time face detection on webcam video feeds, built with React, FastAPI, and MongoDB.

## Features

- Live webcam recording and streaming
- Real-time face detection using MediaPipe
- ROI (Region of Interest) tracking and storage
- Video playback with detected faces highlighted
- Metadata storage and retrieval
- Containerized application using Docker

## Architecture

The application consists of three main components:

1. **Frontend (React)**
   - Webcam video capture
   - Live video preview
   - Processed video playback
   - ROI data visualization

2. **Backend (FastAPI)**
   - Video processing API
   - Face detection using MediaPipe
   - ROI calculation and storage
   - Video streaming endpoints

3. **Database (MongoDB)**
   - Stores video metadata
   - Stores ROI coordinates
   - Maintains processing history

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)
- Modern web browser with webcam support

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/video-face-detection.git
cd video-face-detection
```

2. Start the application using Docker Compose:
```bash
docker-compose up --build
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Development Setup

### Frontend Development

```bash
cd frontend
npm install
npm start
```

The frontend development server will run on http://localhost:3000

### Backend Development

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.main:app --reload
```

The backend development server will run on http://localhost:8000

## API Endpoints

### Video Processing

- `POST /api/video/upload`
  - Uploads and processes video feed
  - Returns video ID and metadata

- `GET /api/video/stream/{video_id}`
  - Streams processed video with face detection

- `GET /api/video/roi/{video_id}`
  - Returns ROI data for the video

## Project Structure

```
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── types/
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routers/
│   │   ├── models.py
│   │   ├── database.py
│   │   └── video_processor.py
│   ├── Dockerfile
│   └── requirements.txt
├── docker-compose.yml
└── README.md
```

## Key Technologies

- **Frontend**
  - React 18
  - TypeScript
  - Styled Components
  - Axios
  - WebRTC (for webcam access)

- **Backend**
  - FastAPI
  - MediaPipe
  - Pillow
  - Python 3.11
  - MongoDB

- **Infrastructure**
  - Docker
  - Docker Compose
  - MongoDB

## Configuration

Environment variables can be configured in the `.env` file:

```env
# Frontend
REACT_APP_API_BASE_URL=http://localhost:8000/api

# Backend
MONGODB_URL=mongodb://mongodb:27017/video_processing
CORS_ORIGINS=http://localhost:3000

# MongoDB
MONGO_INITDB_DATABASE=video_processing
```

## Running in Production

For production deployment, use the production Docker Compose configuration:

```bash
docker-compose -f docker-compose.prod.yml up --build
```

## Testing

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
cd backend
pytest
```

## Common Issues

1. **Webcam Access**
   - Ensure your browser has permission to access the webcam
   - Check if another application is using the webcam

2. **Video Processing**
   - Large videos may take longer to process
   - Ensure sufficient system resources are available

3. **Docker Issues**
   - Ensure all required ports are available
   - Check Docker logs for detailed error messages


## Acknowledgments

- MediaPipe for face detection
- FastAPI for the backend framework
- React team for the frontend framework
- MongoDB for the database




