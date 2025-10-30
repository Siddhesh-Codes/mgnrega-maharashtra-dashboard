const express = require('express');
const router = express.Router();
const DistrictData = require('../models/DistrictData');
const { cache } = require('../services/dataSync');

/**
 * GET /api/districts
 * Get all districts for a state
 */
router.get('/', async (req, res) => {
  try {
    const { state = 'MAHARASHTRA' } = req.query;
    
    const cacheKey = `districts_${state}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return res.json({ source: 'cache', data: cached });
    }
    
    const districts = await DistrictData.distinct('districtName', { 
      stateName: state 
    });
    
    cache.set(cacheKey, districts);
    
    res.json({ source: 'database', data: districts });
  } catch (error) {
    console.error('Error fetching districts:', error);
    res.status(500).json({ error: 'Failed to fetch districts' });
  }
});

/**
 * GET /api/districts/:districtName
 * Get detailed data for a specific district
 */
router.get('/:districtName', async (req, res) => {
  try {
    const { districtName } = req.params;
    const { state = 'MAHARASHTRA', year = '2024-2025' } = req.query;
    
    const cacheKey = `district_${state}_${districtName}_${year}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return res.json({ source: 'cache', data: cached });
    }
    
    // Get current data
    const currentData = await DistrictData.findOne({
      stateName: state,
      districtName: districtName.toUpperCase(),
      financialYear: year
    }).sort({ updatedAt: -1 });
    
    // Get historical data (last 6 months)
    const historicalData = await DistrictData.find({
      stateName: state,
      districtName: districtName.toUpperCase()
    })
    .sort({ monthYear: -1 })
    .limit(6);
    
    // Get state average for comparison
    const stateAverage = await DistrictData.aggregate([
      {
        $match: {
          stateName: state,
          financialYear: year
        }
      },
      {
        $group: {
          _id: null,
          avgJobCards: { $avg: '$totalJobCards' },
          avgWorkers: { $avg: '$totalWorkers' },
          avgDays: { $avg: '$averageDaysPerHousehold' },
          avgExpenditure: { $avg: '$totalExpenditure' }
        }
      }
    ]);
    
    const result = {
      current: currentData,
      historical: historicalData,
      stateAverage: stateAverage[0] || null,
      comparison: currentData && stateAverage[0] ? {
        jobCardsVsState: ((currentData.totalJobCards / stateAverage[0].avgJobCards) * 100).toFixed(1),
        workersVsState: ((currentData.totalWorkers / stateAverage[0].avgWorkers) * 100).toFixed(1),
        daysVsState: ((currentData.averageDaysPerHousehold / stateAverage[0].avgDays) * 100).toFixed(1)
      } : null
    };
    
    cache.set(cacheKey, result);
    
    res.json({ source: 'database', data: result });
  } catch (error) {
    console.error('Error fetching district data:', error);
    res.status(500).json({ error: 'Failed to fetch district data' });
  }
});

/**
 * GET /api/districts/:districtName/summary
 * Get simplified summary for low-literacy users
 */
router.get('/:districtName/summary', async (req, res) => {
  try {
    const { districtName } = req.params;
    const { state = 'MAHARASHTRA' } = req.query;
    
    const data = await DistrictData.findOne({
      stateName: state,
      districtName: districtName.toUpperCase(),
      financialYear: '2024-2025'
    }).sort({ updatedAt: -1 });
    
    if (!data) {
      return res.status(404).json({ error: 'District not found' });
    }
    
    // Simplified metrics for low-literacy population
    const summary = {
      districtName: data.districtName,
      metrics: {
        totalFamilies: data.totalJobCards,
        totalWorkers: data.totalWorkers,
        peopleWorking: data.activeWorkers,
        daysOfWork: Math.round(data.averageDaysPerHousehold),
        moneySpent: formatCurrency(data.totalExpenditure),
        projectsCompleted: data.completedWorks,
        projectsOngoing: data.ongoingWorks,
        womenWorkers: data.womenWorkers
      },
      indicators: {
        isPerformingWell: data.averageDaysPerHousehold >= 50,
        employmentRate: ((data.activeWorkers / data.totalWorkers) * 100).toFixed(1),
        completionRate: data.totalWorks > 0 ? 
          ((data.completedWorks / data.totalWorks) * 100).toFixed(1) : 0
      },
      lastUpdated: data.updatedAt
    };
    
    res.json({ data: summary });
  } catch (error) {
    console.error('Error fetching district summary:', error);
    res.status(500).json({ error: 'Failed to fetch district summary' });
  }
});

/**
 * Helper function to format currency in Indian format
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

module.exports = router;
