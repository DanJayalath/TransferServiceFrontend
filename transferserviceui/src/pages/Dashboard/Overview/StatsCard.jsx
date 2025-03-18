import React from "react";

export default function StatsCard({ title, value, percentage, icon }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
      <p
        className={`text-sm mt-1 ${
          percentage.startsWith("+") ? "text-green-600" : "text-red-600"
        }`}
      >
        {percentage}
      </p>
    </div>
  );
}