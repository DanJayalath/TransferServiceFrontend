// WhyChooseUs.js
import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const reasons = [
    { title: 'Online Booking', description: 'Booking with us is easy and flexible. With our user-friendly app or a simple phone call, you can have a taxi at your doorstep in no time.', icon: '/Images/OnlineBookingService.jpeg' },
    { title: 'Professional Drivers', description: 'Your safety is our priority. Our experienced drivers and well-maintained vehicles ensure you reach your destination securely.', icon: '/Images/CabDriverWCU.jpeg' },
    { title: 'Variety of Car Brands', description: 'Lorem ipsum dolor sit amet...', icon: '/Images/vehiclesWCU.jpg' },
    { title: 'Customer Satisfaction', description: 'our satisfaction is our goal, and we are always ready to go the extra mile to make your journey pleasant and stress-free.', icon: '/Images/CustomerSatisfactionWCU.jpeg' },
  ];

  return (
    <section className="why-choose-us">
      <h2>Why Choose Us</h2>
      <p>We use only the best in our services...</p>
      <div className="reasons-grid">
        {reasons.map((reason, index) => (
          <div key={index} className="reason-card">
            <img src={reason.icon} alt={reason.title} />
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;