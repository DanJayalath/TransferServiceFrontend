// src/Components/ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ title, description, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105">
      {/* Image */}
      <div className="w-full h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Content */}
      <div className="p-6">
        <h4 className="text-xl font-semibold text-black mb-2">{title}</h4>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;