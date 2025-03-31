// ContactInfo.js
import React from 'react';
import './ContactInfo.css';

const ContactInfo = () => {
  return (
    <section className="contact-info">
      <h2>Contact Information</h2>
      <p>Reach out to us directly using the details below.</p>
      <div className="info-grid">
        <div className="info-card">
          <h3>Address</h3>
          <p>123 Rue de Paris, 75001 Paris, France</p>
        </div>
        <div className="info-card">
          <h3>Phone</h3>
          <p>+33 6 52 46 66 94</p>
        </div>
        <div className="info-card">
          <h3>Email</h3>
          <p>info@pariseasymove.com</p>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;