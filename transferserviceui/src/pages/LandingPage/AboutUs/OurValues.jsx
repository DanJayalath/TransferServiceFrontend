// OurValues.js
import React from 'react';
import './OurValues.css';

const OurValues = () => {
  const values = [
    { title: 'Reliable taxi services', description: 'we make sure you get to where you want to be.', icon: '/Images/AboutUsPage/ValuesImg1.jpeg' },
    { title: 'Comfortable and Safe Rides', description: 'We always care about your comfort and safety.', icon: '/Images/AboutUsPage/ValuesImg2.jpeg' },
    { title: 'Customer Focus', description: 'Your satisfaction is our priority.', icon: '/Images/AboutUsPage/ValuesImg3.jpeg' },
    { title: 'Professional and friendly drivers', description: 'We have drivers who are always willing to assist and kind.', icon: '/Images/AboutUsPage/ValuesImg4.jpeg' },
    { title: 'Innovation', description: 'We embrace the latest technology.', icon: '/Images/AboutUsPage/ValuesImg5.jpeg' },
  ];

  return (
    <section className="our-values">
      <h2>Our Values</h2>
      <p>These principles guide everything we do at PARIS EASY MOVE</p>
      <div className="values-grid">
        {values.map((value, index) => (
          <div key={index} className="value-card">
            <img src={value.icon} alt={value.title} />
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurValues;