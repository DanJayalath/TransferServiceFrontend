import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function MonthlyBookingsChart() {
  // Chart data with all months
  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Booking Trends",
        data: [100, 120, 150, 140, 160, 180, 200, 190, 170, 160, 140, 130],
        fill: false, // No fill under the line
        borderColor: "rgba(75, 192, 192, 1)", // Teal line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // For points
        borderWidth: 2,
        stepped: "middle", // Creates a stepped line effect
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // Show legend
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => `${context.parsed.y}k bookings`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          color: "#666",
          font: {
            size: 14,
          },
        },
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Bookings (in thousands)",
          color: "#666",
          font: {
            size: 14,
          },
        },
        ticks: {
          stepSize: 50, // Control the interval between ticks
          callback: (value) => `${value}k`,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Light grid lines
        },
      },
    },
  };

  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
      <h2 className="text-sm font-medium text-gray-700 mb-2">Booking Trends</h2>
      <div style={{ height: "300px", width: "100%" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}