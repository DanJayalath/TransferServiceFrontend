import React from "react";

export default function CustomerDemographics() {
  // Sample data with coordinates adjusted for the image (approximate for 1000x500 viewBox)
  const customerLocations = [
    { name: "USA", coordinates: [200, 250], count: 2579 }, // Approximate North America
    { name: "France", coordinates: [400, 180], count: 647 }, // Approximate Europe
    { name: "Germany", coordinates: [420, 190], count: 450 }, // Approximate Europe
    { name: "Australia", coordinates: [800, 300], count: 300 }, // Approximate Australia
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm w-full max-w-2xl">
      <h2 className="text-sm font-medium text-gray-700 mb-4">Customer Demographics</h2>
      <p className="text-xs text-gray-500 mb-2">Number of customers based on country</p>

      {/* Container with internet URL map and pins */}
      <div className="relative w-full h-64 bg-gray-100 rounded overflow-hidden">
        {/* Background image from an internet URL */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/World_Map-Reg_Gan_001.svg/1200px-World_Map-Reg_Gan_001.svg.png" // Public domain world map
          alt="World Map"
          className="w-full h-full object-cover opacity-50"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
        />

        {/* SVG overlay for pins */}
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid meet"
          className="absolute top-0 left-0 w-full h-full"
          style={{ zIndex: 1 }}
        >
          {/* Pins for customer locations */}
          {customerLocations.map((location, index) => (
            <g key={index}>
              <circle
                cx={location.coordinates[0]}
                cy={location.coordinates[1]}
                r="6"
                fill="#3b82f6"
                stroke="#fff"
                strokeWidth="2"
              />
              <text
                x={location.coordinates[0]}
                y={location.coordinates[1] - 10}
                textAnchor="middle"
                style={{ fontSize: "10px", fill: "#3b82f6", fontWeight: "bold" }}
              >
                {location.count}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-4 bg-white p-2 rounded shadow" style={{ zIndex: 2 }}>
          {/* USA */}
          <div className="flex items-center">
            <span className="w-5 h-3.5 bg-blue-800 rounded-sm mr-2"></span>
            <div>
              <p className="text-xs text-gray-700">USA</p>
              <p className="text-xs text-gray-500">2,579 customers</p>
            </div>
          </div>

          {/* France */}
          <div className="flex items-center">
            <span className="w-5 h-3.5 bg-gray-400 rounded-sm mr-2"></span>
            <div>
              <p className="text-xs text-gray-700">France</p>
              <p className="text-xs text-gray-500">647 customers</p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="flex flex-col space-y-1">
            <div className="flex items-center">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <span className="text-xs text-gray-700 ml-2">70%</span>
            </div>
            <div className="flex items-center">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-400 rounded-full"
                  style={{ width: "25%" }}
                ></div>
              </div>
              <span className="text-xs text-gray-700 ml-2">25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}