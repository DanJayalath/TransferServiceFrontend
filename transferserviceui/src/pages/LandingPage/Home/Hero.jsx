// Hero.js
import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
    <div className="hero-content">
      {/* <h1>PARIS EASY MOVE</h1>
      <p>We offer the professional car rental services</p> */}
      <div className="hero-image">
        {/* <img src="/HeroSectionImage_LuxuryCab.jpeg" alt="Luxury Car" /> */}
      </div>
      <div className="hero-container">
        <div className="introduction">
          <h1>Explore Paris with Paris Easy Move Transfer</h1> <br/>
          <p>Experience Paris travel at its best with our Prestige Transfer service. Whether it’s a Charles de Gaulle to Paris shuttle, Orly to Disney transfer or Charles de Gaulle to Disneyland Paris transfer, our reliable services ensure a smooth and comfortable ride. Enjoy hassle-free trips with our Airport shuttles and door to door service. Book now for a seamless journey!</p>
          {/* <p>Paris Easy Move transfer, your trusted provider of reliable and budget-friendly Paris Prestige Transfer services. We specialize in Paris airport shuttles, and Paris airport transfers to all suburban airports, hotels, offices, and residences, Beauvais to Paris transfers. Enjoy seamless Orly Airport to Disney shuttles, Charles de Gaulle to Paris transfers, and Disneyland shuttles tailored to your needs. With our Paris to Versailles Palace shuttle service, travel is made easy and convenient. No hidden costs – you’ll know the exact amount when you book. Our 100% free booking process requires no prepayments; pay at the end of your transfer for a smooth, hassle-free experience.</p> */}
        </div>
        {/* <div className="booking-form">
          <h3>Book Your Tour Now</h3> <br/>
          <form>
            <label htmlFor="trip-type">Trip Type:</label>
            <select name="trip-type" id="trip-type">
              <option value="">Select Trip Type</option>
              <option value="one-way">One Way</option>
              <option value="round-trip">Round Trip</option>
              <option value="hourly">Hourly</option>
            </select>
            <label htmlFor="from">From:</label>
            <select name="from" id="from">
              <option value="">Select From Location</option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
              <option value="location3">Location 3</option>
            </select>
            <label htmlFor="to">To:</label>
            <select name="to" id="to">
              <option value="">Select To Location</option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
              <option value="location3">Location 3</option>
            </select>
            <label htmlFor="passengers-adult">Passengers (Adult):</label>
            <select name="passengers-adult" id="passengers-adult">
              <option value="">Select Number of Adults</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label htmlFor="passengers-children">Passengers (Children):</label>
            <select name="passengers-children" id="passengers-children">
              <option value="">Select Number of Children</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <label htmlFor="price">Price:</label>
            <input type="text" placeholder="Price" name="price" id="price" />
            <button type="submit">Register Now</button>
          </form>
        </div> */}
      </div>
    </div>
  </section>
  );
};

export default Hero;