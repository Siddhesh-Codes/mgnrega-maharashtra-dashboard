const express = require('express');
const router = express.Router();
const DistrictData = require('../models/DistrictData');
const { cache, syncAllStates, syncMGNREGAData } = require('../services/dataSync');
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
    console.log('📍 Fetching districts for state:', stateName);
    
    if (!INDIAN_STATES[stateName]) {
      console.error('❌ State not found:', stateName);
      console.log('Available states:', Object.keys(INDIAN_STATES));
      return res.status(404).json({ error: 'State not found', requestedState: stateName });
    }
    
    const districts = INDIAN_STATES[stateName].districts.sort();
    console.log(`✅ Found ${districts.length} districts for ${stateName}`);
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

/**
 * POST /api/states/sync
 * Manually trigger data sync for all states
 */
router.post('/sync', async (req, res) => {
  try {
    console.log('Manual sync triggered for all states');
    res.json({ message: 'Sync started in background', status: 'processing' });
    
    // Run sync in background
    syncAllStates().catch(err => console.error('Manual sync error:', err));
  } catch (error) {
    console.error('Error triggering sync:', error);
    res.status(500).json({ error: 'Failed to trigger sync' });
  }
});

/**
 * POST /api/states/:stateName/sync
 * Manually trigger data sync for a specific state
 */
router.post('/:stateName/sync', async (req, res) => {
  try {
    const stateName = req.params.stateName.toUpperCase();
    
    if (!INDIAN_STATES[stateName]) {
      return res.status(404).json({ error: 'State not found' });
    }
    
    console.log(`Manual sync triggered for ${stateName}`);
    res.json({ message: `Sync started for ${stateName}`, status: 'processing' });
    
    // Run sync in background
    syncMGNREGAData(stateName).catch(err => console.error(`Sync error for ${stateName}:`, err));
  } catch (error) {
    console.error('Error triggering sync:', error);
    res.status(500).json({ error: 'Failed to trigger sync' });
  }
});

module.exports = router;
