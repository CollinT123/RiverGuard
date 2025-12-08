# RiverGuard Frontend

The frontend application for **RiverGuard**, a modern web platform for analyzing water body videos to detect garbage and debris. Built with Next.js 15 and React 19.

## 🌊 Overview

The RiverGuard frontend provides an intuitive interface for:
- Uploading video files for garbage detection analysis
- Viewing statistics and analysis results
- Managing video streams and processing history
- Learning about the project and contributing

## ✨ Features

- **Modern UI/UX**: Clean, responsive design built with Next.js App Router
- **Drag & Drop Upload**: Easy video file upload with drag-and-drop support
- **Stream URL Support**: Process videos from URLs
- **Real-time Statistics**: View analysis results and garbage detection counts
- **Firebase Integration**: Real-time data synchronization with Firestore
- **Dashboard**: Centralized view for uploads and statistics
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Next.js 15**: React framework with App Router
- **React 19**: UI library with latest features
- **Firebase Client SDK**: Real-time database access and Firestore integration
- **CSS Modules**: Scoped styling for components
- **Lucide React**: Icon library for UI elements

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Backend API** running (see main README for backend setup)
- **Firebase Project** configured (for data persistence)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd FrontEnd
npm install
```

### 2. Configure Environment

The frontend uses `config.js` for configuration. Update the backend URL if needed:

```javascript
// FrontEnd/config.js
export const config = {
  backendUrl: 'http://localhost:8000', // Update for production
  firebase: {
    // Firebase config (already configured)
  }
}
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
FrontEnd/
├── src/
│   ├── app/
│   │   ├── page.js                 # Home page
│   │   ├── layout.js               # Root layout
│   │   ├── globals.css             # Global styles
│   │   ├── dashboard/
│   │   │   ├── page.js             # Dashboard page (Upload/View tabs)
│   │   │   └── page.module.css
│   │   ├── about/
│   │   │   ├── page.js             # About page
│   │   │   └── page.module.css
│   │   ├── donate/
│   │   │   ├── page.js             # Donate page
│   │   │   └── page.module.css
│   │   ├── components/
│   │   │   ├── FileDrop/           # File upload component
│   │   │   │   ├── FileDrop.js
│   │   │   │   └── filedrop.module.css
│   │   │   ├── ViewStats/          # Statistics viewer
│   │   │   │   ├── ViewStats.js
│   │   │   │   └── viewstats.module.css
│   │   │   ├── Navbar/             # Navigation bar
│   │   │   │   ├── Navbar.js
│   │   │   │   └── navbar.module.css
│   │   │   ├── HowTo/              # Instructions component
│   │   │   │   ├── HowTo.js
│   │   │   │   ├── howto.module.css
│   │   │   │   ├── Tab1.js
│   │   │   │   ├── Tab2.js
│   │   │   │   └── Tab3.js
│   │   │   └── DonateOption/       # Donation component
│   │   │       ├── DonateOption.js
│   │   │       └── donateoption.module.css
│   │   └── api/                    # Next.js API routes
│   │       └── streams/
│   │           ├── route.js        # Streams CRUD operations
│   │           └── [id]/
│   │               └── route.js     # Individual stream operations
│   └── lib/
│       └── firebase.js             # Firebase client configuration
├── config.js                       # Frontend configuration
├── middleware.js                   # Next.js middleware (logging, security headers)
├── middlewareUpload.js            # Upload-specific middleware
├── next.config.mjs                 # Next.js configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## 🎯 Key Components

### FileDrop Component

Handles video file uploads with drag-and-drop functionality.

**Features:**
- Drag and drop file upload
- File picker button
- URL input for stream links
- Multiple file support
- Duration input
- File list management

**Location:** `src/app/components/FileDrop/FileDrop.js`

### ViewStats Component

Displays analysis statistics and results from processed videos.

**Location:** `src/app/components/ViewStats/ViewStats.js`

### Navbar Component

Navigation bar with links to main sections.

**Location:** `src/app/components/Navbar/Navbar.js`

### HowTo Component

Interactive instructions with tabs explaining how to use RiverGuard.

**Location:** `src/app/components/HowTo/HowTo.js`

## 🔌 API Routes

### Next.js API Routes

The frontend includes Next.js API routes for server-side operations:

#### `GET /api/streams`

Fetch all video streams from Firestore.

**Query Parameters:**
- `status` (optional): Filter by status (e.g., "Active")

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "stream_id",
      "url": "stream_url",
      "streamID": "stream_identifier",
      "status": "Active",
      "createdAt": "timestamp",
      "lastHealthCheck": "timestamp"
    }
  ]
}
```

#### `POST /api/streams`

Create a new stream entry.

**Request Body:**
```json
{
  "url": "stream_url",
  "streamID": "stream_identifier",
  "keepFrames": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "generated_id",
    "url": "stream_url",
    "streamID": "stream_identifier",
    "status": "Active",
    "createdAt": "timestamp"
  }
}
```

#### `GET /api/streams/[id]`

Fetch a specific stream by ID.

#### `PUT /api/streams/[id]`

Update a specific stream.

#### `DELETE /api/streams/[id]`

Delete a specific stream.

## 🔧 Configuration

### Backend URL

Configure the backend API URL in `config.js`:

```javascript
export const config = {
  backendUrl: process.env.BACKEND_COMPUTER_URL || 'http://localhost:8000',
  // ...
}
```

For production, set the `BACKEND_COMPUTER_URL` environment variable.

### Firebase Configuration

Firebase is configured in `src/lib/firebase.js`. The configuration includes:

- **Project ID**: `trashapi-6eced`
- **Firestore Database**: Used for storing video analysis results
- **Collections**: 
  - `videos`: Video analysis results
  - `streams`: Stream management data

### Environment Variables

Create a `.env.local` file for local development:

```env
BACKEND_COMPUTER_URL=http://localhost:8000
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

## 🎨 Styling

The project uses **CSS Modules** for component-scoped styling. Each component has its own `.module.css` file.

**Global Styles:**
- `src/app/globals.css`: Global CSS variables and base styles

**Component Styles:**
- Each component has a corresponding `.module.css` file
- Styles are scoped to components to avoid conflicts

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Test Firebase connection
npm run test:firestore

# Run simple tests
npm run test:simple
```

## 🔄 Development Workflow

### Adding a New Component

1. Create a new directory in `src/app/components/`
2. Add component file (e.g., `MyComponent.js`)
3. Add styles file (e.g., `mycomponent.module.css`)
4. Import and use in your pages

### Adding a New Page

1. Create a new directory in `src/app/`
2. Add `page.js` file
3. Add `page.module.css` for styles (optional)
4. The route will be automatically available (e.g., `/my-page`)

### Adding an API Route

1. Create a new directory in `src/app/api/`
2. Add `route.js` file
3. Export HTTP method handlers (GET, POST, etc.)
4. The route will be available at `/api/your-route`

## 🐛 Troubleshooting

### Common Issues

#### 1. Backend Connection Errors

**Problem:** Frontend can't connect to backend API.

**Solutions:**
- Verify backend is running: `curl http://localhost:8000/health`
- Check `config.js` has correct backend URL
- Verify CORS is enabled in backend
- Check browser console for specific error messages

#### 2. Firebase Connection Issues

**Problem:** Firebase operations fail.

**Solutions:**
- Verify Firebase configuration in `src/lib/firebase.js`
- Check Firebase project is active
- Verify Firestore rules allow read/write operations
- Check browser console for Firebase errors

#### 3. Build Errors

**Problem:** `npm run build` fails.

**Solutions:**
- Clear `.next` directory: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript/ESLint errors
- Verify all dependencies are installed

#### 4. Port Already in Use

**Problem:** Port 3000 is already in use.

**Solutions:**
```bash
# Use a different port
npm run dev -- -p 3001

# Or kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Debug Commands

```bash
# Check for linting errors
npm run lint

# Test Firebase connection
npm run test:firestore

# View build output
npm run build

# Check Next.js version
npx next --version
```

## 🔒 Security

### Security Headers

The application includes security headers via middleware:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`
- `X-XSS-Protection: 1; mode=block`
- `Permissions-Policy`: Restricts camera, microphone, geolocation

### Best Practices

- **Environment Variables**: Never commit sensitive data to version control
- **Firebase Rules**: Configure Firestore security rules appropriately
- **CORS**: Restrict CORS origins in production
- **Input Validation**: Validate all user inputs
- **File Upload Limits**: Enforce file size and type restrictions

## 🚢 Deployment

### Vercel Deployment

The easiest way to deploy is using Vercel:

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

**Environment Variables to Set:**
- `BACKEND_COMPUTER_URL`: Your backend API URL
- `NEXT_PUBLIC_FIREBASE_API_KEY`: Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Firebase project ID

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Configure build command and publish directory
- **AWS Amplify**: Connect repository and configure build settings
- **Docker**: Use Next.js Docker image
- **Self-hosted**: Run `npm run build && npm start`

### Production Checklist

- [ ] Set production backend URL
- [ ] Configure Firebase for production
- [ ] Set up environment variables
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up error monitoring
- [ ] Optimize images and assets
- [ ] Test all features in production environment

## 📊 Performance Optimization

### Next.js Optimizations

- **Image Optimization**: Use `next/image` for optimized images
- **Code Splitting**: Automatic code splitting by Next.js
- **Static Generation**: Use static generation where possible
- **API Route Optimization**: Cache API responses when appropriate

### Best Practices

- Minimize bundle size
- Use CSS Modules for scoped styles
- Lazy load components when possible
- Optimize Firebase queries
- Cache frequently accessed data

## 🧪 Testing

### Manual Testing

```bash
# Test Firebase connection
npm run test:firestore

# Run simple tests
npm run test:simple
```

### Testing Checklist

- [ ] File upload functionality
- [ ] Drag and drop works
- [ ] URL input works
- [ ] Statistics display correctly
- [ ] Navigation works
- [ ] Responsive design on mobile
- [ ] Firebase data syncs correctly
- [ ] API routes function properly

## 📚 Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

### Firebase Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Client SDK](https://firebase.google.com/docs/web/setup)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

[Specify your license here]

---

**RiverGuard Frontend** - Built with Next.js and React for a better tomorrow. 🌊♻️
