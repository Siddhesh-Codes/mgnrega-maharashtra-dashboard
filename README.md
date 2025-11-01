# MGNREGA Dashboard - हमारी आवाज़, हमारे अधिकार# MGNREGA Dashboard - हमारी आवाज़, हमारे अधिकार



[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://mgnrega-maharashtra-dashboard-production.up.railway.app)## 🎯 Project Overview

[![GitHub](https://img.shields.io/badge/github-repo-blue)](https://github.com/Siddhesh-Codes/mgnrega-maharashtra-dashboard)

[![Node.js](https://img.shields.io/badge/node-%3E%3D18-green)](https://nodejs.org)A production-ready web application that makes MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act) data accessible to rural Indians with low data literacy. The platform provides district-wise performance metrics in an easy-to-understand visual format.

[![MongoDB](https://img.shields.io/badge/mongodb-7.0-green)](https://www.mongodb.com)

### Key Features

> A production-ready web application making MGNREGA data accessible across India with multi-language support

- ✅ **Auto-detect user location** to show relevant district data

## 🎯 Overview- 📊 **Visual dashboards** with charts and simple metrics

- 🗣️ **Hindi language interface** for better accessibility

This dashboard provides transparent access to MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act) employment data for **16 Indian states** and **541 districts** in a simple, visual format.- 💾 **Offline-first architecture** with database caching

- 🚀 **Production-ready** with Docker deployment

**Live Demo**: [https://mgnrega-maharashtra-dashboard-production.up.railway.app](https://mgnrega-maharashtra-dashboard-production.up.railway.app)- 📱 **Mobile-responsive** design

- ⚡ **High performance** with caching layers

## ✨ Key Features

## 🏗️ Architecture

| Feature | Description |

|---------|-------------|### Technology Stack

| 🗺️ **Multi-State** | Coverage of 16 Indian states |

| 📍 **Auto-Location** | Detect user's district automatically |**Frontend:**

| 🌐 **Multi-Language** | English, Hindi (हिंदी), Marathi (मराठी) |- React 18 with Vite

| 📊 **Visual Charts** | Interactive data visualization |- Recharts for data visualization

| 📱 **Mobile Ready** | Responsive design for all devices |- Lucide React for icons

| ⚡ **Fast** | Cached responses < 500ms |- CSS3 with custom variables

| 🎨 **Professional** | Custom branding and logo |

**Backend:**

## 🚀 Quick Start- Node.js with Express

- MongoDB for data persistence

### Prerequisites- Node-Cron for scheduled data sync

- Node.js 18+- NodeCache for in-memory caching

- MongoDB 7.0+

**Infrastructure:**

### Installation- Docker & Docker Compose

- Nginx reverse proxy

```bash- MongoDB database

# Clone repository

git clone https://github.com/Siddhesh-Codes/mgnrega-maharashtra-dashboard.git### Design Decisions

cd mgnrega-maharashtra-dashboard

#### 1. **Low-Literacy Friendly UI**

# Install dependencies- Large fonts (18px base, up to 2.5rem headings)

npm install- Icon-based navigation with minimal text

cd client && npm install && cd ..- Color-coded metrics (green = good, orange = needs attention)

- Simple charts with clear labels

# Setup environment- Hindi language support

cp .env.example .env

# Edit .env with your MONGODB_URI#### 2. **Data Caching Strategy**

- **Layer 1:** In-memory cache (1 hour TTL) for API responses

# Start development- **Layer 2:** MongoDB database for historical data

npm run dev           # Terminal 1: Backend- **Layer 3:** Scheduled daily sync from data.gov.in API

cd client && npm run dev  # Terminal 2: Frontend- Graceful fallback to sample data if API is unavailable

```

#### 3. **Location Detection**

Visit: http://localhost:5173- Browser Geolocation API for coordinates

- Haversine formula for nearest district calculation

## 🛠️ Tech Stack- Fallback to manual selection if location denied



**Frontend**: React 18, Vite, Recharts, React Router  #### 4. **Production Readiness**

**Backend**: Node.js, Express, MongoDB, Mongoose  - Rate limiting (100 req/15min per IP)

**Deployment**: Railway.app (FREE hosting)- Gzip compression

- Security headers (Helmet.js)

## 📊 Data Coverage- Error handling middleware

- Health check endpoints

- **States**: 16 major Indian states- Logging system

- **Districts**: 541 districts

- **Metrics**: Job cards, employment, expenditure, projects## 📁 Project Structure

- **Languages**: English, Hindi, Marathi

```

## 📁 Project Structuremgnrega-dashboard/

├── client/                  # React frontend

```│   ├── src/

├── client/              # React frontend│   │   ├── components/     # Reusable components

│   ├── public/          # Static assets (logo, favicon)│   │   │   └── Header.jsx

│   └── src/│   │   ├── pages/          # Page components

│       ├── components/  # Reusable components│   │   │   ├── Home.jsx

│       ├── pages/       # Page components│   │   │   ├── DistrictDashboard.jsx

│       └── context/     # React Context (Language)│   │   │   └── About.jsx

├── server/              # Node.js backend│   │   ├── App.jsx

│   ├── config/          # State configurations│   │   └── main.jsx

│   ├── models/          # MongoDB schemas│   ├── index.html

│   ├── routes/          # API endpoints│   ├── package.json

│   └── services/        # Data sync services│   └── vite.config.js

└── docs/                # Documentation├── server/                  # Node.js backend

```│   ├── models/             # MongoDB schemas

│   │   ├── DistrictData.js

## 🌐 API Endpoints│   │   └── DistrictLocation.js

│   ├── routes/             # API routes

```bash│   │   ├── district.js

# Get all states│   │   ├── state.js

GET /api/states│   │   └── location.js

│   ├── services/           # Business logic

# Get districts for a state│   │   └── dataSync.js

GET /api/states/:stateName/districts│   └── index.js            # Server entry point

├── Dockerfile              # Container configuration

# Get district details├── docker-compose.yml      # Multi-container setup

GET /api/districts/:districtName/summary?state=STATE_NAME├── nginx.conf              # Nginx configuration

├── deploy.sh               # Deployment script

# Auto-detect location├── package.json

POST /api/location/detect-district└── README.md

``````



## 🎨 Features Showcase## 🚀 Installation & Setup



### State Selection### Prerequisites

Select from 16 Indian states and view district-level data- Node.js 18+ 

- MongoDB 7+

### District Dashboard- Docker & Docker Compose (for production)

- Total job cards issued

- Active workers employed  ### Local Development

- Employment days provided

- Total expenditure1. **Clone the repository**

- Work completion rates```bash

- Women participationgit clone <repository-url>

- Social category distributioncd GOV\ Project

```

### Multi-Language

Switch between English, Hindi, and Marathi for better accessibility2. **Install dependencies**

```bash

## 🔧 Configurationnpm run install-all

```

### Environment Variables

3. **Configure environment**

```env```bash

# Requiredcp .env.example .env

MONGODB_URI=mongodb://localhost:27017/mgnrega# Edit .env with your configuration

NODE_ENV=development```

PORT=5000

4. **Start MongoDB**

# Optional```bash

CACHE_TTL=3600# If using Docker:

```docker run -d -p 27017:27017 --name mongodb mongo:7



### Adding New States# Or use local MongoDB installation

```

Edit `server/config/states.js`:

5. **Run development servers**

```javascript```bash

'STATE_NAME': {npm run dev

  code: 'XX',  // MGNREGA state code```

  districts: ['DISTRICT1', 'DISTRICT2', ...]

}This starts:

```- Backend server: http://localhost:5000

- Frontend dev server: http://localhost:3000

## 🚀 Deployment

### Production Deployment

Deployed on **Railway.app** with:

- ✅ Automatic deployments from GitHub1. **On your VPS (Ubuntu/Debian):**

- ✅ MongoDB hosting included```bash

- ✅ Free SSL certificates# Make deployment script executable

- ✅ Environment variable managementchmod +x deploy.sh



**Deploy Your Own**:# Run deployment

1. Fork this repository./deploy.sh

2. Connect to Railway.app```

3. Add MONGODB_URI environment variable

4. Deploy!2. **Configure firewall**

```bash

## 📚 Documentationsudo ufw allow 80/tcp

sudo ufw allow 443/tcp

Comprehensive documentation available in [docs/DOCUMENTATION.md](docs/DOCUMENTATION.md):sudo ufw enable

```

- Complete API reference

- Deployment guide3. **Access your application**

- Architecture details```

- Performance optimizationhttp://YOUR_SERVER_IP

- Troubleshooting guide```



## 🤝 Contributing### Manual Docker Deployment



Contributions welcome! Please:```bash

1. Fork the repository# Build and start all services

2. Create a feature branchdocker-compose up -d

3. Make your changes

4. Submit a pull request# View logs

docker-compose logs -f

## 📝 License

# Stop services

Open source - Available for educational purposesdocker-compose down

```

## 👨‍💻 Author

## 🔧 Configuration

**Developed for**: Bharat Digital Fellowship Program  

**Purpose**: Making government data accessible to every Indian  ### Environment Variables

**Year**: 2025

```env

---# Server

PORT=5000

### 🌟 Star this repo if you find it useful!NODE_ENV=production



**Live Demo**: [View Dashboard →](https://mgnrega-maharashtra-dashboard-production.up.railway.app)# Database

MONGODB_URI=mongodb://localhost:27017/mgnrega

# API (Optional)
DATA_GOV_API_KEY=your_api_key
DATA_GOV_BASE_URL=https://api.data.gov.in/resource

# Caching
CACHE_TTL=3600

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📊 API Endpoints

### Districts
- `GET /api/districts` - List all districts
- `GET /api/districts/:districtName` - Detailed district data
- `GET /api/districts/:districtName/summary` - Simplified summary

### States
- `GET /api/states` - List all states
- `GET /api/states/:stateName/overview` - State-level overview

### Location
- `POST /api/location/detect-district` - Auto-detect district
- `GET /api/location/districts-map` - All districts with coordinates

### Health
- `GET /api/health` - Service health check

## 🎨 Design for Low-Literacy Population

### Visual Design Principles

1. **Large, Clear Typography**
   - Minimum 18px base font size
   - High contrast (WCAG AA compliant)
   - Hindi language primary

2. **Icon-Heavy Interface**
   - Every metric has an associated icon
   - Color coding for quick understanding
   - Minimal text, maximum visuals

3. **Simple Navigation**
   - Large, touch-friendly buttons
   - Auto-detect location (no typing needed)
   - Search with autocomplete

4. **Data Visualization**
   - Pie charts for proportions
   - Progress bars for percentages
   - Large numbers for key metrics
   - Color indicators (green/yellow/red)

5. **Mobile-First**
   - Responsive grid layouts
   - Touch-optimized interactions
   - Optimized for slow networks

## 🔐 Security Features

- Helmet.js security headers
- Rate limiting per IP
- Input validation
- CORS configuration
- MongoDB injection prevention
- Environment variable protection

## ⚡ Performance Optimizations

- In-memory caching (NodeCache)
- Database indexing
- Gzip compression
- Static asset caching
- Code splitting (Vite)
- Lazy loading
- Image optimization

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 🧪 Testing

### Manual Testing Checklist

- [ ] Home page loads correctly
- [ ] District selection works
- [ ] Auto-detect location works
- [ ] District dashboard displays data
- [ ] Charts render properly
- [ ] Mobile responsive design
- [ ] API endpoints respond
- [ ] Database stores data
- [ ] Caching works

## 🚦 Monitoring

### Health Checks
```bash
# Application health
curl http://YOUR_SERVER_IP/api/health

# Docker services status
docker-compose ps
```

### Logs
```bash
# Application logs
docker-compose logs -f app

# Nginx logs
docker-compose logs -f nginx

# MongoDB logs
docker-compose logs -f mongodb
```

## 🔄 Data Sync

The application syncs data from data.gov.in:
- **Scheduled:** Daily at 2 AM
- **Manual:** Restart the application
- **Fallback:** Uses sample data if API unavailable

## 🌟 Future Enhancements

- [ ] Multi-language support (English, more regional languages)
- [ ] Voice navigation for complete illiteracy
- [ ] SMS/WhatsApp notifications
- [ ] Comparison between districts
- [ ] Year-over-year trends
- [ ] Export reports as PDF
- [ ] Citizen feedback system
- [ ] Integration with more states

## 📝 License

This project is open source and available for public use.

## 👥 Contributing

Contributions are welcome! Please feel free to submit pull requests.

## 📧 Support

For issues or questions, please create an issue in the repository.

---

**Built for Bharat Digital Fellowship**
*Making government data accessible to every Indian*
