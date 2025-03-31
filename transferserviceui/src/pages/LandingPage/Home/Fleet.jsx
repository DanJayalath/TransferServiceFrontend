// Fleet.js
import React, { useState } from 'react';
import './Fleet.css';

const Fleet = () => {
  const [activeTab, setActiveTab] = useState('Luxury');

  const cars = [
    { category: 'Luxury', name: 'Mercedes-Benz S Class', img: 'mercedes-s.jpg', seats: 2, doors: 4 },
    { category: 'Business', name: 'Mercedes-Benz V Class', img: 'mercedes-v.jpg', seats: 6, doors: 4 },
    { category: 'Luxury', name: 'Audi A8', img: 'audi-a8.jpg', seats: 2, doors: 4 },
    { category: 'Crossover', name: 'Rolls-Royce', img: 'rolls-royce.jpg', seats: 2, doors: 4 },
  ];

  const filteredCars = cars.filter(car => car.category === activeTab);

  return (
    <section className="fleet">
      <h2>Our Fleet</h2>
      <p>We offer an extensive range of vehicles including sedans...</p>
      <div className="tabs">
        <button onClick={() => setActiveTab('Luxury')} className={activeTab === 'Luxury' ? 'active' : ''}>Luxury</button>
        <button onClick={() => setActiveTab('Business')} className={activeTab === 'Business' ? 'active' : ''}>Business</button>
        <button onClick={() => setActiveTab('Crossover')} className={activeTab === 'Crossover' ? 'active' : ''}>Crossover</button>
      </div>
      <div className="fleet-grid">
        {filteredCars.map((car, index) => (
          <div key={index} className="fleet-card">
            <img src={car.img} alt={car.name} />
            <h3>{car.name}</h3>
            <p>Seats: {car.seats} | Doors: {car.doors}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Fleet;