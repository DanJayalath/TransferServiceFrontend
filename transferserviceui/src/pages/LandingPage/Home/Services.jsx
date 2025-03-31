// Services.js
import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    { title: 'Charles de Gaulle Airport to Disney', description: 'A private transfer from Charles de Gaulle Airport (CDG) to Disneyland Paris, offering door-to-door service. Pre-book a car or van for a stress-free, direct ride to your Disney hotel or park entrance, ideal for families or groups.', img: '/Images/Services1.webp' },
    { title: 'Orly Airport to Disney', description: 'A private transfer from Orly Airport to Disneyland Paris offers a comfortable and direct journey with a dedicated driver, ensuring a stress-free start to your Disney experience.', img: '/Images/Services2.webp' },
    { title: 'Beauvais–Tillé Airport to Disney', description: 'Enjoy a seamless private transfer from Beauvais–Tillé Airport to Disneyland Paris in a comfortable, air-conditioned vehicle. Avoid long waits and travel in style with a personalized, door-to-door service.', img: '/Images/Services3.webp' },
    
  ];

  return (
    <section className="services">
      <h2>Our Popular Services</h2>
      <p>We invite you to try our services, and we personally guarantee...</p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <img src={service.img} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <button>Book Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;