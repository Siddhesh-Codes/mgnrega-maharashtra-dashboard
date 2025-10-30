const express = require('express');
const router = express.Router();
const axios = require('axios');
const DistrictLocation = require('../models/DistrictLocation');

// Sample district coordinates for Maharashtra
const MAHARASHTRA_DISTRICTS = {
  'MUMBAI': { lat: 19.0760, lng: 72.8777 },
  'PUNE': { lat: 18.5204, lng: 73.8567 },
  'NAGPUR': { lat: 21.1458, lng: 79.0882 },
  'THANE': { lat: 19.2183, lng: 72.9781 },
  'NASHIK': { lat: 19.9975, lng: 73.7898 },
  'AURANGABAD': { lat: 19.8762, lng: 75.3433 },
  'SOLAPUR': { lat: 17.6599, lng: 75.9064 },
  'AMRAVATI': { lat: 20.9374, lng: 77.7796 },
  'KOLHAPUR': { lat: 16.7050, lng: 74.2433 },
  'SANGLI': { lat: 16.8524, lng: 74.5815 },
  'JALGAON': { lat: 21.0077, lng: 75.5626 },
  'AHMEDNAGAR': { lat: 19.0948, lng: 74.7480 },
  'LATUR': { lat: 18.4088, lng: 76.5604 },
  'DHULE': { lat: 20.9042, lng: 74.7749 },
  'RATNAGIRI': { lat: 16.9902, lng: 73.3120 },
  'SATARA': { lat: 17.6805, lng: 74.0183 },
  'NANDED': { lat: 19.1383, lng: 77.3210 },
  'BEED': { lat: 18.9894, lng: 75.7607 },
  'JALNA': { lat: 19.8347, lng: 75.8800 },
  'OSMANABAD': { lat: 18.1770, lng: 76.0398 }
};

/**
 * POST /api/location/detect-district
 * Detect district based on user's coordinates
 */
router.post('/detect-district', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    
    // Find nearest district using simple distance calculation
    let nearestDistrict = null;
    let minDistance = Infinity;
    
    for (const [district, coords] of Object.entries(MAHARASHTRA_DISTRICTS)) {
      const distance = calculateDistance(
        latitude, longitude,
        coords.lat, coords.lng
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestDistrict = district;
      }
    }
    
    // Reverse geocoding for better accuracy (optional - requires API key)
    let detectedLocation = {
      district: nearestDistrict,
      state: 'MAHARASHTRA',
      confidence: minDistance < 50 ? 'high' : minDistance < 100 ? 'medium' : 'low',
      distance: Math.round(minDistance)
    };
    
    res.json({ data: detectedLocation });
  } catch (error) {
    console.error('Error detecting district:', error);
    res.status(500).json({ error: 'Failed to detect district' });
  }
});

/**
 * GET /api/location/districts-map
 * Get all districts with their coordinates
 */
router.get('/districts-map', async (req, res) => {
  try {
    const districtsMap = Object.entries(MAHARASHTRA_DISTRICTS).map(([name, coords]) => ({
      name,
      latitude: coords.lat,
      longitude: coords.lng
    }));
    
    res.json({ data: districtsMap });
  } catch (error) {
    console.error('Error fetching districts map:', error);
    res.status(500).json({ error: 'Failed to fetch districts map' });
  }
});

/**
 * Calculate distance between two coordinates using Haversine formula
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

module.exports = router;
