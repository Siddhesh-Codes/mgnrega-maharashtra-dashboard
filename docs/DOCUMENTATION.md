# MGNREGA Dashboard - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Setup & Installation](#setup--installation)
5. [Project Structure](#project-structure)
6. [Deployment](#deployment)
7. [API Documentation](#api-documentation)
8. [Contributing](#contributing)

---

## 🎯 Project Overview

A production-ready web application that makes MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act) data accessible across India. The platform provides state and district-wise performance metrics in an easy-to-understand visual format with multi-language support.

### Vision
Make government scheme data transparent and accessible to every Indian citizen, especially those in rural areas with limited digital literacy.

### Current Coverage
- **16 Indian States**
- **541 Districts**
- **3 Languages**: English, Hindi, Marathi

---

## ✨ Features

### Core Features
- 🗺️ **Multi-State Support** - Select any of 16 Indian states
- 📍 **Auto-Location Detection** - Automatically detect user's district
- 📊 **Visual Dashboards** - Interactive charts and graphs
- 🌐 **Multi-Language** - English, Hindi (हिंदी), Marathi (मराठी)
- 📱 **Mobile Responsive** - Works on all devices
- ⚡ **Fast Performance** - Caching and optimization
- 🎨 **Professional UI** - Custom logo and branding

### Data Insights
- Total job cards issued
- Active workers employed
- Employment days provided
- Total expenditure breakdown
- Work completion rates
- Women workers participation
- Social category distribution (SC/ST/Others)

### User Experience
- Simple navigation
- Low data usage
- Accessible design
- No registration required
- Instant data access

---

## 🛠️ Technology Stack

### Frontend
```
React 18.2.0          - UI framework
Vite 5.0.0            - Build tool & dev server
React Router 6.20.1   - Client-side routing
Recharts 2.10.3       - Data visualization
Lucide React 0.294.0  - Icon library
Axios 1.6.2           - HTTP client
```

### Backend
```
Node.js 18+           - Runtime environment
Express 4.18.2        - Web framework
MongoDB 7.0           - Database
Mongoose 8.0.3        - MongoDB ODM
NodeCache 5.1.2       - In-memory caching
node-cron 3.0.3       - Task scheduling
```

### Deployment
```
Railway.app           - Hosting platform (FREE)
MongoDB Atlas         - Database hosting (Railway)
GitHub                - Version control & CI/CD
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18 or higher
- MongoDB 7.0 or higher
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/Siddhesh-Codes/mgnrega-maharashtra-dashboard.git
cd mgnrega-maharashtra-dashboard
```

2. **Install dependencies**
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

3. **Environment Setup**
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your configuration
# Required: MONGODB_URI
```

4. **Start Development Servers**

Terminal 1 (Backend):
```bash
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## 📁 Project Structure

```
mgnrega-maharashtra-dashboard/
│
├── client/                      # React frontend
│   ├── public/
│   │   ├── logo.svg            # Main logo
│   │   ├── favicon.svg         # Favicon
│   │   └── favicon-16x16.svg   # Small favicon
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   └── ...
│   │   ├── context/            # React Context
│   │   │   └── LanguageContext.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── DistrictDashboard.jsx
│   │   │   └── About.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Node.js backend
│   ├── config/
│   │   └── states.js           # State & district configuration
│   ├── models/
│   │   ├── DistrictData.js     # MongoDB schema
│   │   └── DistrictLocation.js
│   ├── routes/
│   │   ├── district.js         # District API routes
│   │   ├── state.js            # State API routes
│   │   └── location.js         # Location API routes
│   ├── services/
│   │   └── dataSync.js         # MGNREGA data sync service
│   └── index.js                # Server entry point
│
├── docs/                        # Documentation
│   ├── DOCUMENTATION.md        # This file
│   └── FEATURE-UPDATE.md       # Feature updates
│
├── .env.example                # Environment template
├── .gitignore
├── package.json                # Root dependencies
└── README.md                   # Project readme
```

---

## 🌐 Deployment

### Railway.app Deployment

The application is deployed on Railway.app (FREE tier) with automatic deployments from GitHub.

**Live URL:** https://mgnrega-maharashtra-dashboard-production.up.railway.app

#### Deployment Process

1. **Connect GitHub Repository**
   - Railway auto-deploys on push to `main` branch
   - No manual deployment needed

2. **Environment Variables** (Set in Railway dashboard)
   ```
   MONGODB_URI=mongodb://...
   NODE_ENV=production
   PORT=5000
   ```

3. **Build Commands**
   ```bash
   # Server builds automatically
   # Client builds in production mode
   cd client && npm install && npm run build
   ```

4. **Start Command**
   ```bash
   npm start
   ```

#### Deployment Features
- ✅ Automatic deployments on git push
- ✅ Environment variable management
- ✅ Monitoring and logs
- ✅ Custom domains (optional)
- ✅ Free SSL certificates
- ✅ MongoDB hosting included

---

## 📡 API Documentation

### Base URL
```
Production: https://mgnrega-maharashtra-dashboard-production.up.railway.app/api
Local: http://localhost:5000/api
```

### Endpoints

#### States

**Get All States**
```http
GET /api/states
```
Response:
```json
{
  "data": [
    {
      "name": "MAHARASHTRA",
      "code": "27",
      "districtCount": 20
    }
  ]
}
```

**Get Districts for State**
```http
GET /api/states/:stateName/districts
```
Response:
```json
{
  "state": "MAHARASHTRA",
  "districts": ["MUMBAI", "PUNE", "NAGPUR", ...]
}
```

**Get State Overview**
```http
GET /api/states/:stateName/overview?year=2024-2025
```

**Sync All States**
```http
POST /api/states/sync
```

#### Districts

**Get Districts List**
```http
GET /api/districts?state=MAHARASHTRA
```

**Get District Details**
```http
GET /api/districts/:districtName?state=MAHARASHTRA&year=2024-2025
```

**Get District Summary**
```http
GET /api/districts/:districtName/summary?state=MAHARASHTRA
```
Response:
```json
{
  "data": {
    "districtName": "MUMBAI",
    "metrics": {
      "totalFamilies": 15234,
      "totalWorkers": 22851,
      "peopleWorking": 13640,
      "daysOfWork": 67,
      "moneySpent": "₹76,17,000",
      "projectsCompleted": 142,
      "projectsOngoing": 38,
      "womenWorkers": 10947
    },
    "indicators": {
      "isPerformingWell": true,
      "employmentRate": "59.7",
      "completionRate": "78.9"
    }
  }
}
```

#### Location

**Detect District by Coordinates**
```http
POST /api/location/detect-district
Content-Type: application/json

{
  "latitude": 19.0760,
  "longitude": 72.8777
}
```

---

## 🎨 Branding & Design

### Logo
- **Design**: India map outline with location pin
- **Colors**: Purple (#667eea), Gold (#f59e0b), Green (#10b981)
- **Symbolism**: 
  - Map pin → Location services
  - Wheat → Agriculture
  - Tool → Infrastructure work
  - Circle → Unity and completeness

### Color Palette
```css
Primary Blue:    #667eea
Primary Dark:    #2563eb
Success Green:   #10b981
Warning Gold:    #f59e0b
Danger Red:      #ef4444
Text Dark:       #1f2937
Text Light:      #6b7280
Border:          #e5e7eb
Background:      #f9fafb
```

### Typography
- **Primary**: System fonts (Arial, Helvetica, sans-serif)
- **Headings**: Bold (700), Large sizes
- **Body**: Regular (400), Medium sizes
- **Hindi/Marathi**: Full Unicode support

---

## 🔧 Configuration

### State Configuration (`server/config/states.js`)

Add new states:
```javascript
'STATE_NAME': {
  code: 'XX',  // MGNREGA API state code
  districts: ['DISTRICT1', 'DISTRICT2', ...]
}
```

### Environment Variables

Required:
```env
MONGODB_URI=mongodb://localhost:27017/mgnrega
NODE_ENV=development
PORT=5000
```

Optional:
```env
CACHE_TTL=3600
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🔄 Data Sync

### Automatic Sync
- Runs daily at 2:00 AM (cron job)
- Syncs all 16 states
- Generates sample data for 541 districts
- Updates database with latest metrics

### Manual Sync
```bash
# Sync all states
curl -X POST http://localhost:5000/api/states/sync

# Sync specific state
curl -X POST http://localhost:5000/api/states/MAHARASHTRA/sync
```

### Data Sources
1. **MGNREGA API** (primary, requires auth)
2. **Public Reports** (fallback)
3. **Sample Data** (development/demo)

---

## 🌍 Multi-Language Support

### Supported Languages
- **English** (en)
- **Hindi** (hi) - हिंदी
- **Marathi** (mr) - मराठी

### Adding New Language

1. Update `client/src/context/LanguageContext.jsx`:
```javascript
export const translations = {
  en: { ... },
  hi: { ... },
  mr: { ... },
  ta: { // Tamil
    heroTitle: 'உங்கள் மாவட்ட MGNREGA செயல்திறனை பார்க்கவும்',
    // ... add all translations
  }
};
```

2. Update language selector in Header.jsx

---

## 📊 Performance

### Optimization Techniques
- ✅ Server-side caching (NodeCache)
- ✅ Database indexing
- ✅ Code splitting (React lazy loading)
- ✅ Image optimization (SVG)
- ✅ Compression middleware
- ✅ Efficient data aggregation

### Load Times
- Initial load: < 2 seconds
- API response: < 500ms (cached)
- Database query: < 200ms (indexed)

---

## 🔒 Security

### Implemented
- Helmet.js for HTTP headers
- CORS configuration
- Input validation
- Error handling
- Rate limiting
- Environment variable protection

### Best Practices
- No sensitive data in frontend
- Secure MongoDB connection
- HTTPS in production
- Regular dependency updates

---

## 🐛 Troubleshooting

### Common Issues

**Problem**: Districts not loading
```bash
# Solution: Check if data is synced
curl http://localhost:5000/api/states/MAHARASHTRA/districts
```

**Problem**: MongoDB connection error
```bash
# Solution: Verify MONGODB_URI in .env
# Ensure MongoDB is running
```

**Problem**: Frontend not connecting to backend
```bash
# Solution: Check Vite proxy in vite.config.js
# Ensure backend is running on port 5000
```

---

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make changes**
4. **Test locally**
5. **Commit with descriptive message**
   ```bash
   git commit -m "Feature: Add XYZ functionality"
   ```
6. **Push to your fork**
7. **Create Pull Request**

### Code Standards
- Use ES6+ JavaScript
- Follow React best practices
- Write meaningful comments
- Test before committing
- Keep files organized

---

## 📝 License

This project is open source and available for educational purposes.

---

## 👥 Credits

**Developed for**: Bharat Digital Fellowship Program  
**Purpose**: Making government data accessible to rural India  
**Year**: 2025

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: [Your contact information]

---

**Last Updated**: November 2025  
**Version**: 2.0.0  
**Status**: Production Ready ✅
