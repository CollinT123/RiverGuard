# RiverGuard

**RiverGuard** is a comprehensive video analysis platform that uses machine learning to detect garbage and debris in water bodies. The system processes video streams through a YOLO-based detection model and stores results in Firebase Firestore for tracking and analysis.

## 🌊 Overview

RiverGuard helps monitor and track pollution in rivers and water bodies by:
- Analyzing video streams for garbage detection
- Providing real-time statistics and visualizations
- Storing historical data for trend analysis
- Offering an intuitive web interface for uploads and viewing results

## ✨ Features

### Backend
- **Video Analysis API**: RESTful API for processing video files
- **YOLO Model Integration**: Real-time garbage detection using trained YOLO models
- **Firebase Integration**: Automatic result persistence to Firestore
- **Docker Containerization**: Scalable microservices architecture
- **Frame Extraction**: Automatic frame sampling from video streams
- **Multi-format Support**: Handles MP4, AVI, MOV, MKV formats

### Frontend
- **Modern UI**: Built with Next.js 15 and React 19
- **Drag & Drop Upload**: Easy video file upload interface
- **Stream URL Support**: Process videos from URLs
- **Dashboard**: View statistics and analysis results
- **Real-time Updates**: Live feedback during processing
- **Responsive Design**: Works on desktop and mobile devices

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │  Backend API    │    │  Model Server   │
│   (Next.js)     │───▶│  (FastAPI)      │───▶│  (YOLO Model)   │
│                 │    │                 │    │                 │
│ - Uploads video │    │ - Receives      │    │ - Receives      │
│ - Sends userId  │    │   video + userId│    │   images        │
│ - Gets results  │◀───│ - Processes     │◀───│ - Runs YOLO     │
│                 │    │   via containers│    │   prediction    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                            │
                            │        ┌─────────────────┐
                            │        │   Firebase      │
                            └───────▶│   Firestore     │
                                     │                 │
                                     │ - Stores results│
                                     │ - Persists data │
                                     └─────────────────┘
                                     ┌─────────────────┐
                                     │ Image Container │
                                     │                 │
                                     │ - Extracts      │
                                     │   frames        │
                                     │ - Sends to      │
                                     │   model         │
                                     └─────────────────┘
```

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **Docker & Docker Compose**: Containerization and orchestration
- **YOLO**: Object detection model for garbage identification
- **Firebase Admin SDK**: Database integration
- **FFmpeg**: Video processing and frame extraction
- **Uvicorn**: ASGI server

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **Firebase Client SDK**: Real-time database access
- **CSS Modules**: Scoped styling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** (version 20.10+)
- **Docker Compose** (version 2.0+)
- **Node.js** (version 18+)
- **npm** or **yarn**
- **Python** (version 3.13+ for local development)
- **Firebase Account**: Service account key file (`RiverGuardAccountKey.json`)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd RiverGuard
```

### 2. Backend Setup

#### 2.1. Configure Firebase

1. Place your Firebase service account key file in the `BackEnd/` directory:
   ```bash
   cp /path/to/your/RiverGuardAccountKey.json BackEnd/RiverGuardAccountKey.json
   ```

2. Ensure the Firebase project ID matches your configuration (default: `trashapi-6eced`)

#### 2.2. Start Backend Services

```bash
cd BackEnd
docker-compose up -d
```

This will:
- Build and start the API server on port `8000`
- Build and start the model server on port `8001`
- Create a Docker network for inter-container communication
- Set up health checks and auto-restart

#### 2.3. Verify Backend is Running

```bash
# Check container status
docker-compose ps

# Test health endpoint
curl http://localhost:8000/health

# View logs
docker-compose logs -f api-server
```

### 3. Frontend Setup

#### 3.1. Install Dependencies

```bash
cd FrontEnd
npm install
```

#### 3.2. Configure Environment

The frontend uses `config.js` for configuration. Update if needed:

```javascript
// FrontEnd/config.js
export const config = {
  backendUrl: 'http://localhost:8000', // Update for production
  // ... other config
}
```

#### 3.3. Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🎯 Usage

### Uploading a Video

1. Navigate to the Dashboard (`/dashboard`)
2. Click "Upload Stream" or drag and drop a video file
3. Enter a duration (optional)
4. Click "Submit"
5. Wait for processing to complete
6. View results in the "View" tab

### API Usage

#### Analyze Video Endpoint

```bash
curl -X POST \
  -F "video_file=@/path/to/video.mp4" \
  -F "userId=user123" \
  http://localhost:8000/api/analyze-video
```

**Response:**
```json
{
  "success": true,
  "userId": "user123",
  "results": {
    "ok": true,
    "video": "video.mp4",
    "frames_sent": 16,
    "responses": [
      {
        "frame": "frame_00001.jpg",
        "response": {
          "garbage_count": 0,
          "filename": "frame_00001.jpg",
          "message": "Image processed successfully"
        }
      }
    ]
  }
}
```

#### Health Check

```bash
curl http://localhost:8000/health
```

## 📁 Project Structure

```
RiverGuard/
├── BackEnd/
│   ├── api_server.py              # FastAPI server with Firebase integration
│   ├── requirements.txt           # Python dependencies
│   ├── Dockerfile                 # API server container config
│   ├── docker-compose.yml         # Multi-container orchestration
│   ├── RiverGuardAccountKey.json  # Firebase service account key
│   ├── temp_uploads/              # Temporary video storage
│   ├── image_container/
│   │   ├── dockerfile
│   │   ├── image_client.py        # Frame extraction client
│   │   └── input/                 # Test video directory
│   └── model_container/
│       ├── dockerfile
│       ├── main.py                # YOLO prediction logic
│       ├── model_server.py        # Model HTTP server
│       └── FinalModel.pt          # Trained YOLO model
│
├── FrontEnd/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js            # Home page
│   │   │   ├── dashboard/         # Dashboard page
│   │   │   ├── about/             # About page
│   │   │   ├── donate/            # Donate page
│   │   │   ├── components/
│   │   │   │   ├── FileDrop/      # File upload component
│   │   │   │   ├── ViewStats/     # Statistics viewer
│   │   │   │   ├── Navbar/        # Navigation bar
│   │   │   │   ├── HowTo/         # Instructions component
│   │   │   │   └── DonateOption/  # Donation component
│   │   │   └── api/               # Next.js API routes
│   │   └── lib/
│   │       └── firebase.js        # Firebase client config
│   ├── config.js                  # Frontend configuration
│   ├── package.json
│   └── next.config.mjs
│
└── README.md                      # This file
```

## 🔧 Configuration

### Backend Environment Variables

The image container supports these environment variables:

- `INPUT_PATH`: Path to input video (set by API server)
- `USER_ID`: User identifier (set by API server)
- `WORKER_URL`: Model server URL (default: `http://visionmodel:8001/`)

### Firebase Configuration

Firebase integration requires:

- **Service Account Key**: `RiverGuardAccountKey.json` in `BackEnd/` directory
- **Firestore Collection**: `videos` (automatically created)
- **Document Structure**:
  ```json
  {
    "userId": "user_id_string",
    "videoFilename": "original_filename.mp4",
    "uploadDate": "timestamp",
    "totalGarbageCount": 19,
    "framesProcessed": 16,
    "garbageCountPerFrame": [0, 0, 0, 1, 2, ...]
  }
  ```

### Docker Compose Services

- **api-server**: FastAPI server with Docker client capabilities
- **visionmodel**: YOLO model server for garbage detection
- **imageclient**: Temporary container for frame extraction

## 🐛 Troubleshooting

### Common Issues

#### 1. Backend API Not Accessible

```bash
# Check if containers are running
docker ps

# Verify API server is running
curl http://localhost:8000/health

# Check logs
docker-compose logs api-server

# Restart services
docker-compose restart api-server
```

#### 2. Model Server Not Responding

```bash
# Check model server logs
docker-compose logs visionmodel

# Verify network connectivity
docker network inspect seniorprojtesting_my-network

# Test model server directly
curl http://localhost:8001/
```

#### 3. Video Processing Fails

- Ensure video file exists and is accessible
- Check file permissions
- Verify FFmpeg is working: `docker exec imageclient ffmpeg -version`
- Check container logs for specific error messages

#### 4. Firebase Integration Issues

```bash
# Verify credentials file exists
ls BackEnd/RiverGuardAccountKey.json

# Check Firebase logs
docker-compose logs api-server | grep -i firebase

# Verify Firebase Admin SDK is installed
docker exec api-server pip list | grep firebase
```

#### 5. Frontend Connection Issues

- Verify backend URL in `FrontEnd/config.js`
- Check CORS settings in `api_server.py`
- Ensure backend is running on the correct port
- Check browser console for errors

### Debug Commands

```bash
# View all container logs
docker-compose logs -f

# Check container status
docker-compose ps

# Inspect Docker network
docker network inspect seniorprojtesting_my-network

# Run container interactively
docker exec -it api-server /bin/bash

# Clean up and restart
docker-compose down
docker-compose up -d --build
```

## 📊 Performance

- **Processing Time**: ~3-5 seconds for a 15-second video (16 frames)
- **Memory Usage**: Containers are created and destroyed per request
- **File Size Limits**: Configured to handle videos up to 100MB (adjustable)
- **Scalability**: Each video processing request runs in isolation

## 🔒 Security Considerations

- **CORS**: Currently set to allow all origins (`allow_origins=["*"]`). Update for production.
- **File Upload**: Implement file size and type validation
- **Firebase**: Keep service account keys secure and never commit to version control
- **API Keys**: Store sensitive configuration in environment variables

## 🧪 Testing

### Backend Testing

```bash
# Test health endpoint
curl http://localhost:8000/health

# Test video analysis
curl -X POST \
  -F "video_file=@test_video.mp4" \
  -F "userId=test_user" \
  http://localhost:8000/api/analyze-video
```

### Frontend Testing

```bash
cd FrontEnd

# Run linting
npm run lint

# Test Firebase connection
npm run test:firestore

# Run simple tests
npm run test:simple
```

## 🚢 Deployment

### Production Considerations

1. **Environment Variables**: Use environment variables for sensitive configuration
2. **CORS**: Restrict CORS to your frontend domain
3. **Firebase**: Use production Firebase project
4. **Docker**: Use production-optimized Docker images
5. **SSL/TLS**: Enable HTTPS for all services
6. **Monitoring**: Set up logging and monitoring services
7. **Backup**: Regular backups of Firebase data

### Docker Production Build

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start production services
docker-compose -f docker-compose.prod.yml up -d
```

## 📝 API Documentation

### Endpoints

#### `POST /api/analyze-video`

Analyzes a video for garbage detection.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Parameters:
  - `video_file` (file, required): Video file to analyze
  - `userId` (string, required): User identifier

**Response:**
```json
{
  "success": true,
  "userId": "user123",
  "results": {
    "ok": true,
    "video": "video.mp4",
    "frames_sent": 16,
    "responses": [...]
  }
}
```

#### `GET /health`

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "service": "video-analysis-api"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

[Specify your license here]

## 👥 Authors

[Add author information]

## 🙏 Acknowledgments

- YOLO model for object detection
- FastAPI for the robust backend framework
- Next.js for the modern frontend framework
- Firebase for data persistence

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review container logs for specific error messages
3. Ensure all services are running: `docker-compose ps`
4. Test the health endpoint: `curl http://localhost:8000/health`

---

**RiverGuard** - Protecting our waterways, one frame at a time. 🌊♻️

