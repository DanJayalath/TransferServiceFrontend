// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="newsletter">
          <h3>Subscribe to the Newsletter</h3>
          <input type="email" placeholder="Email" />
          <button>Subscribe</button>
        </div>
        <div className="footer-links">
          <div>
            <h4>Top Cities</h4>
            <ul>
              <li>New York</li>
              <li>Berlin</li>
              <li>Paris</li>
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li>Intercity Rides</li>
              <li>Chauffeur Service</li>
              <li>Airport Transfers</li>
            </ul>
          </div>
          <div>
            <h4>Destinations</h4>
            <ul>
              <li>London</li>
              <li>New York</li>
              <li>Philadelphia</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2020 LIMO5. Terms | Privacy Policy | Accessibility</p>
      </div>
    </footer>
  );
};

export default Footer;