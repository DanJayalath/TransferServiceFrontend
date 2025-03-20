import React from "react";

export default function CustomerDemographics() {
  const customerLocations = [
    { name: "USA", coordinates: [200, 250], count: 2579 },
    { name: "France", coordinates: [400, 180], count: 647 },
    { name: "Germany", coordinates: [420, 190], count: 450 },
    { name: "Australia", coordinates: [800, 300], count: 300 },
  ];

  // Calculate total customers for percentage
  const totalCustomers = customerLocations.reduce((sum, loc) => sum + loc.count, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm w-full max-w-2xl">
      <h2 className="text-sm font-medium text-gray-700 mb-4">Customer Demographics</h2>
      <p className="text-xs text-gray-500 mb-2">Number of customers based on country</p>

      <div className="relative w-full h-64 bg-gray-100 rounded overflow-hidden">
        {/* Try using the SVG directly instead of PNG */}
        <svg
          className="w-full h-full object-cover opacity-50"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
        >
          <image
            href="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Biome_map_13.svg/960px-Biome_map_13.svg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>

        {/* Pins overlay */}
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid meet"
          className="absolute top-0 left-0 w-full h-full"
          style={{ zIndex: 1 }}
        >
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

        {/* Updated Legend */}
        <div 
          className="absolute bottom-4 left-4 bg-white p-2 rounded shadow" 
          style={{ zIndex: 2 }}
        >
          {customerLocations.map((location, index) => (
            <div key={index} className="flex items-center mb-2 last:mb-0">
              <span 
                className={`w-5 h-3.5 rounded-sm mr-2 ${
                  index === 0 ? 'bg-blue-800' : 
                  index === 1 ? 'bg-gray-400' : 
                  index === 2 ? 'bg-green-600' : 'bg-purple-600'
                }`}
              ></span>
              <div className="flex items-center">
                <div className="mr-4">
                  <p className="text-xs text-gray-700">{location.name}</p>
                  <p className="text-xs text-gray-500">{location.count.toLocaleString()} customers</p>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        index === 0 ? 'bg-blue-600' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-green-600' : 'bg-purple-600'
                      }`}
                      style={{ width: `${(location.count / totalCustomers) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-700 ml-2">
                    {Math.round((location.count / totalCustomers) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}