import React from 'react';

const ChauffeurServiceSection = () => {
  return (
    <div className="mt-12 mb-12 mx-auto max-w-6xl bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-center">
      {/* Left Column: Image with Badge */}
      <div className="relative flex-1 flex justify-center items-center">
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-black border-2 border-gray-500 rounded-full w-32 h-32 flex items-center justify-center text-center">
          <span className="text-gray-500 text-sm font-semibold">
            20+ Years of Excellence
          </span>
        </div>
        {/* Image from Unsplash */}
        <img
          src="https://plus.unsplash.com/premium_photo-1663012943379-9580ab9340a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Luxury black car in Paris"
          className="w-[400px] h-[300px] rounded-lg object-cover"
        />
      </div>

      {/* Right Column: Text Content */}
      <div className="flex-1 p-8">
        <p className="text-gray-500 uppercase text-sm tracking-wider mb-2">
          About Us
        </p>
        <h1 className="text-4xl font-bold text-black mb-4">
          Luxury Chauffeur Services in Paris
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-6">
          Experience the elegance of Paris with our premium chauffeur services. We
          provide tailored, high-end transportation for every occasion.
        </p>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center text-gray-700">
            <span className="text-black text-xl mr-2">•</span>
            Professional drivers with extensive knowledge of Paris.
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-black text-xl mr-2">•</span>
            Luxury vehicles for comfort and style.
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-black text-xl mr-2">•</span>
            Punctual and discreet service for all your needs.
          </li>
        </ul>
        <button className="bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-800 transition duration-300">
          Discover More +
        </button>
      </div>
    </div>
  );
};

export default ChauffeurServiceSection;