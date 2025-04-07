// src/Home/WhyChooseUs.jsx
import React from 'react';
import { FaCar, FaUserTie, FaMapPin } from 'react-icons/fa'; // Import icons

const WhyChooseUs = () => {
  const reasons = [
    {
      title: 'Best Quality Taxi',
      description: 'There are many variations of passages available but the majority have suffered alteration in form injected humour words which don’t look even slightly believable. If you are going passage you need there anything embar.',
      number: '01',
      icon: <FaCar className="text-gray-600 text-2xl" />,
    },
    {
      title: 'Expert Drivers',
      description: 'There are many variations of passages available but the majority have suffered alteration in form injected humour words which don’t look even slightly believable. If you are going passage you need there anything.',
      number: '02',
      icon: <FaUserTie className="text-gray-600 text-2xl" />,
    },
    {
      title: 'Many Locations',
      description: 'There are many variations of passages available but the majority have suffered alteration in form injected humour words which don’t look even slightly believable. If you are going passage you need there anything embar.',
      number: '03',
      icon: <FaMapPin className="text-gray-600 text-2xl" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-800 w-full rounded-3xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Left Column: Heading and Image */}
        <div className="flex-1 mb-12 lg:mb-0">
          <p className="text-gray-400 uppercase text-sm tracking-wider mb-2">
            Why Choose Us
          </p>
          <h2 className="text-4xl font-bold text-white mb-6">
            We Are Dedicated To Provide Quality Service
          </h2>
          <p className="text-gray-300 text-base leading-relaxed mb-8">
            There are many variations of passages available but the majority have
            suffered alteration in some form going to use a passage by injected humour
            random words which don’t look even slightly believable.
          </p>
          <img
            src="https://plus.unsplash.com/premium_photo-1663012943379-9580ab9340a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Luxury car"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Right Column: Cards */}
        <div className="flex-1 flex flex-col space-y-6 lg:pl-12">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 flex items-start space-x-4 shadow-md"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                {reason.icon}
              </div>
              {/* Content */}
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-black mb-2">
                  {reason.title}
                </h4>
                <p className="text-gray-600 text-sm">{reason.description}</p>
              </div>
              {/* Number Badge */}
              <div className="bg-gray-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {reason.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;