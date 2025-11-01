const express = require('express');
const router = express.Router();
const DistrictData = require('../models/DistrictData');
const { cache } = require('../services/dataSync');
const { INDIAN_STATES } = require('../config/states');

/**
 * GET /api/states
 * Get list of all states
 */
router.get('/', async (req, res) => {
  try {
    const states = Object.keys(INDIAN_STATES).sort().map(stateName => ({
      name: stateName,
      code: INDIAN_STATES[stateName].code,
      districtCount: INDIAN_STATES[stateName].districts.length
    }));
    
    res.json({ data: states });
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ error: 'Failed to fetch states' });
  }
});

/**
 * GET /api/states/:stateName/districts
 * Get districts for a specific state
 */
router.get('/:stateName/districts', async (req, res) => {
  try {
    const stateName = req.params.stateName.toUpperCase();
    
    if (!INDIAN_STATES[stateName]) {
      return res.status(404).json({ error: 'State not found' });
    }
    
    const districts = INDIAN_STATES[stateName].districts.sort();
    res.json({ state: stateName, districts });
  } catch (error) {
    console.error('Error fetching districts:', error);
    res.status(500).json({ error: 'Failed to fetch districts' });
  }
});

/**
 * GET /api/states/:stateName/overview
 * Get state-level overview
 */
router.get('/:stateName/overview', async (req, res) => {
  try {
    const { stateName } = req.params;
    const { year = '2024-2025' } = req.query;
    
    const cacheKey = `state_overview_${stateName}_${year}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return res.json({ source: 'cache', data: cached });
    }
    
    const overview = await DistrictData.aggregate([
      {
        $match: {
          stateName: stateName.toUpperCase(),
          financialYear: year
        }
      },
      {
        $group: {
          _id: null,
          totalDistricts: { $sum: 1 },
          totalJobCards: { $sum: '$totalJobCards' },
          totalWorkers: { $sum: '$totalWorkers' },
          activeWorkers: { $sum: '$activeWorkers' },
          totalExpenditure: { $sum: '$totalExpenditure' },
          totalWorks: { $sum: '$totalWorks' },
          completedWorks: { $sum: '$completedWorks' },
          avgDays: { $avg: '$averageDaysPerHousehold' },
          womenWorkers: { $sum: '$womenWorkers' }
        }
      }
    ]);
    
    const topDistricts = await DistrictData.find({
      stateName: stateName.toUpperCase(),
      financialYear: year
    })
    .sort({ averageDaysPerHousehold: -1 })
    .limit(5)
    .select('districtName averageDaysPerHousehold activeWorkers');
    
    const result = {
      overview: overview[0] || {},
      topPerformers: topDistricts
    };
    
    cache.set(cacheKey, result);
    
    res.json({ source: 'database', data: result });
  } catch (error) {
    console.error('Error fetching state overview:', error);
    res.status(500).json({ error: 'Failed to fetch state overview' });
  }
});

module.exports = router;
