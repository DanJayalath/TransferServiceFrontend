import React from "react";

export default function RecentBookingsTable() {
  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
      <h2 className="text-sm font-medium text-gray-700">Recent Bookings</h2>
      <table className="w-full text-sm text-gray-700 mt-2">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Service</th>
            <th className="py-2 text-left">Category</th>
            <th className="py-2 text-left">Price</th>
            <th className="py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2">Luxury Sedan</td>
            <td>Sedan</td>
            <td>$129.00</td>
            <td className="text-green-600">Delivered</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">SUV Service</td>
            <td>SUV</td>
            <td>$189.00</td>
            <td className="text-orange-600">Pending</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">Executive Van</td>
            <td>Van</td>
            <td>$249.00</td>
            <td className="text-red-600">Canceled</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}