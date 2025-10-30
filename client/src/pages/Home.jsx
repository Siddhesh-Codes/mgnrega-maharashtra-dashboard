import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Navigation, TrendingUp } from 'lucide-react';
import axios from 'axios';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [selectedState] = useState('MAHARASHTRA');

  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    try {
      const response = await axios.get(`/api/districts?state=${selectedState}`);
      setDistricts(response.data.data);
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
              अपने जिले का MGNREGA प्रदर्शन देखें
            </h1>
            <p className="hero-subtitle">
              महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी योजना
            </p>
            
            <button 
              className="auto-detect-btn"
              onClick={handleAutoDetect}
              disabled={detectingLocation}
            >
              <Navigation size={28} />
              <div>
                <div className="btn-text">
                  {detectingLocation ? 'खोजा जा रहा है...' : 'अपना जिला खोजें'}
                </div>
                <div className="btn-subtext">स्वचालित स्थान पहचान</div>
              </div>
            </button>
            
            <div className="or-divider">
              <span>या</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="search-section card">
          <h2 className="section-title">
            <MapPin size={32} />
            अपना जिला चुनें
          </h2>
          
          <div className="search-box">
            <Search className="search-icon" size={24} />
            <input
              type="text"
              placeholder="जिले का नाम खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>जिले लोड हो रहे हैं...</p>
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
                <p className="no-results">कोई जिला नहीं मिला</p>
              )}
            </div>
          )}
        </div>

        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon" style={{ background: '#dbeafe' }}>
              <span style={{ fontSize: '2rem' }}>👥</span>
            </div>
            <h3>12.15 करोड़+</h3>
            <p>लाभार्थी (2025)</p>
          </div>

          <div className="info-card">
            <div className="info-icon" style={{ background: '#d1fae5' }}>
              <span style={{ fontSize: '2rem' }}>💼</span>
            </div>
            <h3>100 दिन</h3>
            <p>गारंटीड रोजगार</p>
          </div>

          <div className="info-card">
            <div className="info-icon" style={{ background: '#fef3c7' }}>
              <span style={{ fontSize: '2rem' }}>🏗️</span>
            </div>
            <h3>ग्रामीण विकास</h3>
            <p>बुनियादी ढांचा</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
