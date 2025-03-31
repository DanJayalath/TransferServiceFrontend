// SpecialOffer.js
import React from 'react';
import './SpecialOffer.css';

const SpecialOffer = () => {
  return (
    <section className="special-offer">
      <h2>ONLY TODAY $65/day</h2>
      <p>Take advantage of our special offer...</p>
      <div className="offer-content">
        <div className="offer-details">
          <h3>Limited Offer for 1 Week</h3>
          <ul>
            <li>Free Meal</li>
            <li>Air Conditioning</li>
            <li>Free Wi-Fi</li>
          </ul>
          <button>Reserve Now</button>
        </div>
        <div className="offer-image">
          <img src="/Images/PicSO.jpg" alt="" />
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;