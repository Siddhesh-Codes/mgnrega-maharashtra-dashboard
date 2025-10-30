const axios = require('axios');
const DistrictData = require('../models/DistrictData');
const NodeCache = require('node-cache');

// Cache for 1 hour
const cache = new NodeCache({ stdTTL: 3600 });

/**
 * Fetch MGNREGA data from data.gov.in API
 * Note: This is a sample implementation. Update with actual API endpoint
 */
async function fetchFromDataGovAPI(stateName, financialYear) {
  try {
    // Sample API call - Update with actual endpoint from data.gov.in
    const apiUrl = `${process.env.DATA_GOV_BASE_URL}/854e5a1f-a4e3-4177-8586-2bcc27b74552`;
    
    const response = await axios.get(apiUrl, {
      params: {
        'api-key': process.env.DATA_GOV_API_KEY,
        format: 'json',
        filters: {
          state_name: stateName,
          financial_year: financialYear
        },
        limit: 1000
      },
      timeout: 30000
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching from Data.gov.in:', error.message);
    throw error;
  }
}

/**
 * Transform API data to our schema format
 */
function transformAPIData(apiData) {
  // Sample transformation - adjust based on actual API response
  return apiData.records.map(record => ({
    stateName: record.state_name || record['State Name'],
    districtName: record.district_name || record['District Name'],
    financialYear: record.financial_year || record['Financial Year'],
    monthYear: record.month_year || record['Month-Year'] || 'Current',
    totalJobCards: parseInt(record.total_jobcards) || 0,
    totalWorkers: parseInt(record.total_workers) || 0,
    activeJobCards: parseInt(record.active_jobcards) || 0,
    activeWorkers: parseInt(record.active_workers) || 0,
    employmentProvided: parseInt(record.employment_provided) || 0,
    averageDaysPerHousehold: parseFloat(record.avg_days_per_household) || 0,
    totalWorks: parseInt(record.total_works) || 0,
    completedWorks: parseInt(record.completed_works) || 0,
    ongoingWorks: parseInt(record.ongoing_works) || 0,
    totalExpenditure: parseFloat(record.total_expenditure) || 0,
    wageExpenditure: parseFloat(record.wage_expenditure) || 0,
    materialExpenditure: parseFloat(record.material_expenditure) || 0,
    scWorkers: parseInt(record.sc_workers) || 0,
    stWorkers: parseInt(record.st_workers) || 0,
    othersWorkers: parseInt(record.others_workers) || 0,
    womenWorkers: parseInt(record.women_workers) || 0
  }));
}

/**
 * Sync MGNREGA data to database
 */
async function syncMGNREGAData(stateName = 'MAHARASHTRA') {
  try {
    console.log(`Syncing MGNREGA data for ${stateName}...`);
    
    const currentYear = '2024-2025';
    
    // Try to fetch from API
    let apiData;
    try {
      apiData = await fetchFromDataGovAPI(stateName, currentYear);
    } catch (apiError) {
      console.warn('API fetch failed, using fallback data');
      // Use sample/fallback data if API fails
      apiData = getSampleData(stateName);
    }
    
    const transformedData = transformAPIData(apiData);
    
    // Bulk upsert to database
    const bulkOps = transformedData.map(record => ({
      updateOne: {
        filter: {
          stateName: record.stateName,
          districtName: record.districtName,
          financialYear: record.financialYear,
          monthYear: record.monthYear
        },
        update: { $set: record },
        upsert: true
      }
    }));
    
    const result = await DistrictData.bulkWrite(bulkOps);
    console.log(`✅ Synced ${result.upsertedCount} new records, ${result.modifiedCount} updated`);
    
    // Clear cache after sync
    cache.flushAll();
    
    return result;
  } catch (error) {
    console.error('Error syncing MGNREGA data:', error);
    throw error;
  }
}

/**
 * Get sample/fallback data for Maharashtra districts
 */
function getSampleData(stateName = 'MAHARASHTRA') {
  // Sample data for demonstration - represents major Maharashtra districts
  const districts = [
    'MUMBAI', 'PUNE', 'NAGPUR', 'THANE', 'NASHIK', 
    'AURANGABAD', 'SOLAPUR', 'AMRAVATI', 'KOLHAPUR', 'SANGLI',
    'JALGAON', 'AHMEDNAGAR', 'LATUR', 'DHULE', 'RATNAGIRI',
    'SATARA', 'NANDED', 'BEED', 'JALNA', 'OSMANABAD'
  ];
  
  return {
    records: districts.map((district, index) => {
      const baseValue = 10000 + (index * 1000);
      return {
        state_name: stateName,
        district_name: district,
        financial_year: '2024-2025',
        month_year: 'October-2025',
        total_jobcards: baseValue + Math.floor(Math.random() * 5000),
        total_workers: (baseValue * 1.5) + Math.floor(Math.random() * 7000),
        active_jobcards: Math.floor(baseValue * 0.6) + Math.floor(Math.random() * 2000),
        active_workers: Math.floor(baseValue * 0.9) + Math.floor(Math.random() * 3000),
        employment_provided: Math.floor(baseValue * 2.5) + Math.floor(Math.random() * 10000),
        avg_days_per_household: 45 + Math.floor(Math.random() * 30),
        total_works: Math.floor(baseValue * 0.1) + Math.floor(Math.random() * 500),
        completed_works: Math.floor(baseValue * 0.05) + Math.floor(Math.random() * 200),
        ongoing_works: Math.floor(baseValue * 0.03) + Math.floor(Math.random() * 150),
        total_expenditure: (baseValue * 500) + Math.floor(Math.random() * 1000000),
        wage_expenditure: (baseValue * 350) + Math.floor(Math.random() * 700000),
        material_expenditure: (baseValue * 150) + Math.floor(Math.random() * 300000),
        sc_workers: Math.floor(baseValue * 0.2) + Math.floor(Math.random() * 1000),
        st_workers: Math.floor(baseValue * 0.05) + Math.floor(Math.random() * 500),
        others_workers: Math.floor(baseValue * 0.4) + Math.floor(Math.random() * 2000),
        women_workers: Math.floor(baseValue * 0.48) + Math.floor(Math.random() * 2500)
      };
    })
  };
}

module.exports = {
  fetchFromDataGovAPI,
  syncMGNREGAData,
  cache
};
