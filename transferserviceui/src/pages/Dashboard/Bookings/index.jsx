import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import Inter font (you can add this in your index.html or CSS)
const interFontLink = (
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
);

export default function Bookings() {
  // Sample data for bookings (now mutable for updates)
  const [bookings, setBookings] = useState([
    {
      id: 1,
      client: { name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", country: "USA" },
      tripType: "One-Way",
      pickUp: "CDG Airport",
      destination: "Paris Hotels",
      flightDetails: { arrivalDate: "2025-03-18", arrivalTime: "10:00 AM" },
      vehicle: { category: "Sedan", model: "Toyota Camry" },
      driver: "Michael Smith",
      passengers: 2,
      children: 1,
      price: 120.5,
      status: "Confirmed",
      comments: "Client requested extra baggage space.",
      refDateAndTime: "2025-03-17 14:30:00",
    },
    {
      id: 2,
      client: { name: "Emma Wilson", email: "emma.wilson@example.com", phone: "987-654-3210", country: "UK" },
      tripType: "Round-Trip",
      pickUp: "Orly Airport",
      destination: "Disneyland",
      flightDetails: { arrivalDate: "2025-03-16", arrivalTime: "08:00 AM" },
      vehicle: { category: "SUV", model: "Honda CR-V" },
      driver: "Sarah Johnson",
      passengers: 4,
      children: 0,
      price: 200.0,
      status: "Pending to Confirm",
      comments: "Client may need a child seat.",
      refDateAndTime: "2025-03-15 09:00:00",
    },
    {
      id: 3,
      client: { name: "Liam Brown", email: "liam.brown@example.com", phone: "555-123-4567", country: "Canada" },
      tripType: "One-Way",
      pickUp: "Paris City",
      destination: "CDG Airport",
      flightDetails: { departureDate: "2025-03-14", departureTime: "02:00 PM" },
      vehicle: { category: "Van", model: "Ford Transit" },
      driver: "David Lee",
      passengers: 6,
      children: 2,
      price: 180.0,
      status: "Completed",
      comments: "",
      refDateAndTime: "2025-03-13 16:00:00",
    },
    {
      id: 4,
      client: { name: "Sophie Turner", email: "sophie.turner@example.com", phone: "444-555-6666", country: "France" },
      tripType: "One-Way",
      pickUp: "Disneyland",
      destination: "Paris City",
      flightDetails: { arrivalDate: "2025-03-19", arrivalTime: "11:00 AM" },
      vehicle: { category: "Sedan", model: "Nissan Altima" },
      driver: "Claire Evans",
      passengers: 3,
      children: 1,
      price: 150.0,
      status: "Pending to Confirm",
      comments: "Client prefers a non-smoking vehicle.",
      refDateAndTime: "2025-03-19 08:00:00",
    },
  ]);

  // State for selected tab and selected booking
  const [selectedTab, setSelectedTab] = useState("Confirmed");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editedPrice, setEditedPrice] = useState(null);
  const [editedStatus, setEditedStatus] = useState(null);

  // Filter bookings for "New Bookings" (Pending to Confirm only)
  const newBookings = bookings
    .filter((booking) => booking.status === "Pending to Confirm")
    .sort((a, b) => new Date(b.refDateAndTime) - new Date(a.refDateAndTime));

  // Filter bookings for "All Bookings" (Confirmed and Completed)
  const filteredBookings = bookings
    .filter((booking) => booking.status === selectedTab && (booking.status === "Confirmed" || booking.status === "Completed"))
    .sort((a, b) => new Date(b.refDateAndTime) - new Date(a.refDateAndTime));

  // Handle saving changes to price and status
  const handleSaveChanges = () => {
    if (selectedBooking) {
      const updatedBookings = bookings.map((booking) =>
        booking.id === selectedBooking.id
          ? {
              ...booking,
              price: editedPrice !== null ? parseFloat(editedPrice) : booking.price,
              status: editedStatus || booking.status,
            }
          : booking
      );
      setBookings(updatedBookings);
      setSelectedBooking({
        ...selectedBooking,
        price: editedPrice !== null ? parseFloat(editedPrice) : selectedBooking.price,
        status: editedStatus || selectedBooking.status,
      });
      setEditedPrice(null);
      setEditedStatus(null);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-inter">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Bookings</h1>

      {/* Section 1: New Bookings (Pending to Confirm only) */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">New Bookings</h2>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {newBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm font-medium">
                    <th className="p-4 text-left">Booking ID</th>
                    <th className="p-4 text-left">Customer</th>
                    <th className="p-4 text-left">Trip Type</th>
                    <th className="p-4 text-left">Pick-Up</th>
                    <th className="p-4 text-left">Destination</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {newBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      onClick={() => {
                        setSelectedBooking(booking);
                        setEditedPrice(booking.price);
                        setEditedStatus(booking.status);
                      }}
                      className={`border-t border-gray-200 text-gray-600 text-sm cursor-pointer ${
                        selectedBooking?.id === booking.id ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="p-4">{booking.id}</td>
                      <td className="p-4">
                        <div>
                          <Link
                            to={`/Dashboard/CustomerProfile/${booking.client.email}`}
                            className="font-medium text-gray-800 hover:text-blue-600"
                          >
                            {booking.client.name}
                          </Link>
                          <p className="text-xs text-gray-500">{booking.client.email}</p>
                        </div>
                      </td>
                      <td className="p-4">{booking.tripType}</td>
                      <td className="p-4">{booking.pickUp}</td>
                      <td className="p-4">{booking.destination}</td>
                      <td className="p-4">${booking.price.toFixed(2)}</td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-6 text-gray-600 text-center">No new bookings (Pending to Confirm).</p>
          )}
        </div>
      </div>

      {/* Section 2: All Bookings with Tabs (Confirmed and Completed) */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-5">All Bookings</h2>
        {/* Tabs */}
        <div className="flex space-x-4 mb-5">
          {["Confirmed", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setSelectedTab(tab);
                setSelectedBooking(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm font-medium">
                  <th className="p-4 text-left">Booking ID</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Trip Type</th>
                  <th className="p-4 text-left">Pick-Up</th>
                  <th className="p-4 text-left">Destination</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Adjustments</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      onClick={() => {
                        setSelectedBooking(booking);
                        setEditedPrice(booking.price);
                        setEditedStatus(booking.status);
                      }}
                      className={`border-t border-gray-200 text-gray-600 text-sm cursor-pointer ${
                        selectedBooking?.id === booking.id ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="p-4">{booking.id}</td>
                      <td className="p-4">
                        <div>
                          <Link
                            to={`/Dashboard/CustomerProfile/${booking.client.email}`}
                            className="font-medium text-gray-800 hover:text-blue-600"
                          >
                            {booking.client.name}
                          </Link>
                          <p className="text-xs text-gray-500">{booking.client.email}</p>
                        </div>
                      </td>
                      <td className="p-4">{booking.tripType}</td>
                      <td className="p-4">{booking.pickUp}</td>
                      <td className="p-4">{booking.destination}</td>
                      <td className="p-4">${booking.price.toFixed(2)}</td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {(booking.status === "Confirmed" || booking.status === "Pending to Confirm") &&
                        booking.comments ? (
                          <span className="text-gray-600 italic">{booking.comments}</span>
                        ) : (
                          <span className="text-gray-400">No adjustments</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-6 text-gray-600 text-center">
                      No bookings found for this status.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Booking Details Section with Edit Options */}
        {selectedBooking && (
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Details (ID: {selectedBooking.id})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">Trip Type:</span> {selectedBooking.tripType}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">Pick-Up:</span> {selectedBooking.pickUp}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">Destination:</span> {selectedBooking.destination}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">Arrival Date & Time:</span>{" "}
                  {selectedBooking.flightDetails.arrivalDate} at {selectedBooking.flightDetails.arrivalTime}
                </p>
                {selectedBooking.flightDetails.departureDate && (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">Departure Date & Time:</span>{" "}
                    {selectedBooking.flightDetails.departureDate} at {selectedBooking.flightDetails.departureTime}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">Vehicle:</span> {selectedBooking.vehicle.category} -{" "}
                  {selectedBooking.vehicle.model}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">Driver:</span> {selectedBooking.driver}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">Passengers:</span> {selectedBooking.passengers} (Children:{" "}
                  {selectedBooking.children})
                </p>
                {/* Editable Price */}
                <div className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">Price:</span>{" "}
                  <input
                    type="number"
                    value={editedPrice !== null ? editedPrice : selectedBooking.price}
                    onChange={(e) => setEditedPrice(e.target.value)}
                    className="ml-2 p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                  />
                </div>
                {/* Editable Status */}
                <div className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">Status:</span>{" "}
                  <select
                    value={editedStatus || selectedBooking.status}
                    onChange={(e) => setEditedStatus(e.target.value)}
                    className="ml-2 p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending to Confirm">Pending to Confirm</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                {(selectedBooking.status === "Confirmed" || selectedBooking.status === "Pending to Confirm") &&
                  selectedBooking.comments && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-gray-900">Adjustments:</span>{" "}
                      <span className="italic">{selectedBooking.comments}</span>
                    </p>
                  )}
                {/* Save Button */}
                <button
                  onClick={handleSaveChanges}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}