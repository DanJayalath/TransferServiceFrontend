import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-section">
      <h1>About Us Page</h1>
      <p>Some text about who we are and what we do.</p>
      <p>Resize the browser window to see that this page is responsive.</p>
      <h2>Our Team</h2>
      <div className="row">
        <div className="column">
          <div className="card">
            <img src="https://via.placeholder.com/150" alt="Jane" />
            <div className="container">
              <h2>Jane Doe</h2>
              <p className="title">CEO & Founder</p>
              <p>Some text that describes Jane.</p>
              <p>jane@example.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <img src="https://via.placeholder.com/150" alt="Mike" />
            <div className="container">
              <h2>Mike Ross</h2>
              <p className="title">Art Director</p>
              <p>Some text that describes Mike.</p>
              <p>mike@example.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <img src="https://via.placeholder.com/150" alt="John" />
            <div className="container">
              <h2>John Doe</h2>
              <p className="title">Designer</p>
              <p>Some text that describes John.</p>
              <p>john@example.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
