import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function BookingTrendsChart() {
  // Sample data for the pie chart with lighter colors
  const data = {
    labels: ["Disneyland", "Paris City", "Orly Airport", "CDG Airport", "Paris Hotels"],
    datasets: [
      {
        label: "Bookings by Location",
        data: [150, 100, 60, 80, 120], // Sample booking counts
        backgroundColor: [
          "#FFB1C1", // Light pink for Disneyland
          "#A3CFFF", // Light blue for Paris City
          "#FFE8A3", // Light yellow for Orly Airport
          "#B3E8E5", // Light teal for CDG Airport
          "#D4C1EC", // Light purple for Paris Hotels
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} bookings (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h2 className="text-sm font-medium text-gray-700 mb-4">Booking Trends by Location</h2>
      <div className="flex flex-row items-center justify-between">
        {/* Pie Chart on the Left, Centered Vertically, Slightly Larger Size */}
        <div className="w-1/2 flex justify-center items-center h-56">
          <div className="max-w-[240px] w-full">
            <Pie data={data} options={options} />
          </div>
        </div>

        {/* Location List on the Right */}
        <div className="w-1/2 pl-4">
          <ul className="space-y-2">
            {data.labels.map((location, index) => (
              <li key={index} className="flex items-center">
                <span
                  className="w-4 h-4 mr-2 inline-block rounded-full"
                  style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
                ></span>
                <span className="text-gray-700">
                  {location}: {data.datasets[0].data[index]} bookings
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}