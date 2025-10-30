import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MapPin } from 'lucide-react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/150px-Emblem_of_India.svg.png" 
              alt="India Emblem" 
              className="logo-img"
            />
            <div className="logo-text">
              <h1>MGNREGA</h1>
              <p className="logo-subtitle">हमारी आवाज़, हमारे अधिकार</p>
            </div>
          </Link>
          
          <nav className="nav">
            <Link to="/" className="nav-link">
              <MapPin size={24} />
              <span>होम पेज</span>
            </Link>
            <Link to="/about" className="nav-link">
              <span>जानकारी</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
