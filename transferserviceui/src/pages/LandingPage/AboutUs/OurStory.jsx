// OurStory.js
import React from 'react';
import './OurStory.css';

const OurStory = () => {
  return (
    <section className="our-story">
      <h2>Our Story</h2>
      <div className="story-content">
        <div className="story-text">
          <p>
          We are Easy Paris move – your partner in realizing your Paris dream. Our love for Paris is what drives us to provide you with a stress-free moving experience. We are happy to help you with your move, whether you’re a student or a professional looking for a new start in France.
          </p>
          <p>
          <b>What Are We?</b><br/> <br/>
            We are the trusted Paris taxi service. Our transportation is reliable and safe. We offer comfortable and hassle-free transportation with our modern vehicles and friendly drivers. We can help you get to or from the airport, as well as around the city.
            <br/><br/>
          <b>Our Mission</b> <br/> <br/>
            Our goal at Paris Easy Move, is to make your travels in Paris as easy and safe as possible. Goal is to ensure that you arrive at your destination on time, and are comfortable while riding. We have a team of professional drivers who are eager to help you enjoy your stay in Paris.
          </p>
        </div>
        <div className="story-image">
          <img src="Images/VehiclesABU.jpg" alt="Company History" />
        </div>
      </div>
    </section>
  );
};

export default OurStory;