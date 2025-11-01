import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Navigation, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [selectedState, setSelectedState] = useState('MAHARASHTRA');

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetchDistricts();
    }
  }, [selectedState]);

  const fetchStates = async () => {
    try {
      const response = await axios.get('/api/states');
      setStates(response.data.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchDistricts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/states/${selectedState}/districts`);
      setDistricts(response.data.districts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching districts:', error);
      setLoading(false);
    }
  };

  const handleDistrictSelect = (districtName) => {
    navigate(`/district/${districtName}`);
  };

  const handleAutoDetect = () => {
    if ('geolocation' in navigator) {
      setDetectingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await axios.post('/api/location/detect-district', {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            
            const detectedDistrict = response.data.data.district;
            navigate(`/district/${detectedDistrict}`);
          } catch (error) {
            console.error('Error detecting district:', error);
            alert('आपके स्थान का पता नहीं लगाया जा सका। कृपया मैन्युअल रूप से जिला चुनें।');
          } finally {
            setDetectingLocation(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('कृपया अपने ब्राउज़र में लोकेशन एक्सेस की अनुमति दें।');
          setDetectingLocation(false);
        }
      );
    } else {
      alert('आपका ब्राउज़र लोकेशन सेवा का समर्थन नहीं करता।');
    }
  };

  const filteredDistricts = districts.filter(district =>
    district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              {t('heroTitle')}
            </h1>
            <p className="hero-subtitle">
              {t('heroSubtitle')}
            </p>
            
            <button 
              className="auto-detect-btn"
              onClick={handleAutoDetect}
              disabled={detectingLocation}
            >
              <Navigation size={28} />
              <div>
                <div className="btn-text">
                  {detectingLocation ? t('detecting') : t('autoDetect')}
                </div>
                <div className="btn-subtext">{t('autoDetect')}</div>
              </div>
            </button>
            
            <div className="or-divider">
              <span>Or</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="search-section card">
          <h2 className="section-title">
            <MapPin size={32} />
            {t('selectDistrict')}
          </h2>
          
          <div className="state-selector">
            <label htmlFor="state-select" className="state-label">
              {t('selectState')}:
            </label>
            <select
              id="state-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="state-dropdown"
            >
              {states.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name} ({state.districtCount} {t('districts')})
                </option>
              ))}
            </select>
          </div>
          
          <div className="search-box">
            <Search className="search-icon" size={24} />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>{t('loading')}</p>
            </div>
          ) : (
            <div className="districts-grid">
              {filteredDistricts.length > 0 ? (
                filteredDistricts.map((district) => (
                  <button
                    key={district}
                    className="district-card"
                    onClick={() => handleDistrictSelect(district)}
                  >
                    <MapPin size={32} className="district-icon" />
                    <span className="district-name">{district}</span>
                    <TrendingUp size={20} className="arrow-icon" />
                  </button>
                ))
              ) : (
                <p className="no-results">{t('noData')}</p>
              )}
            </div>
          )}
        </div>

        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon" style={{ background: '#dbeafe' }}>
              <MapPin size={32} />
            </div>
            <h3>12.15 {t('crore')}+</h3>
            <p>{t('beneficiaries')} (2025)</p>
          </div>

          <div className="info-card">
            <div className="info-icon" style={{ background: '#d1fae5' }}>
              <TrendingUp size={32} />
            </div>
            <h3>100 {t('days')}</h3>
            <p>{t('guaranteedDays')}</p>
          </div>

          <div className="info-card">
            <div className="info-icon" style={{ background: '#fef3c7' }}>
              <Search size={32} />
            </div>
            <h3>{t('ruralDevelopment')}</h3>
            <p>{t('infrastructure')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
