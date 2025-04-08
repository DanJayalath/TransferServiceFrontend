import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import Inter font (you can add this in your index.html or CSS)
const interFontLink = (
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
);

export default function Bookings() {
  const BOOKINGS_API_URL = "https://localhost:7299/api/Bookings";

  // State for bookings, selected tab, and selected booking
  const [bookings, setBookings] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Confirmed");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editedPrice, setEditedPrice] = useState(null);
  const [editedStatus, setEditedStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch bookings from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await fetch(BOOKINGS_API_URL);
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data = await response.json();

        // Map the API data to the format expected by the component
        const mappedBookings = data.map(booking => ({
          id: booking.id,
          client: {
            name: booking.name,
            email: booking.email,
            phone: booking.telephone,
            country: booking.country,
          },
          tripType: booking.tripType.charAt(0).toUpperCase() + booking.tripType.slice(1),
          pickUp: booking.pickupLocation,
          destination: booking.dropOffLocation,
          flightDetails: {
            arrivalDate: booking.arrivalDateTime ? new Date(booking.arrivalDateTime).toLocaleDateString() : null,
            arrivalTime: booking.arrivalDateTime ? new Date(booking.arrivalDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null,
            departureDate: booking.departureDateTime ? new Date(booking.departureDateTime).toLocaleDateString() : null,
            departureTime: booking.departureDateTime ? new Date(booking.departureDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null,
          },
          vehicle: {
            category: booking.vehicleCategory,
            model: booking.vehicleModel,
          },
          driver: "TBD", // Placeholder; update if driver info is available
          passengers: booking.passengers,
          children: 0, // Placeholder; update if child info is available
          price: booking.totalPrice,
          status: booking.status,
          comments: booking.remarks || "",
          refDateAndTime: new Date(booking.createdAt).toISOString(),
        }));

        setBookings(mappedBookings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings for "New Bookings" (Pending to Confirm only)
  const newBookings = bookings
    .filter((booking) => booking.status === "Pending to Confirm")
    .sort((a, b) => new Date(b.refDateAndTime) - new Date(a.refDateAndTime));

  // Filter bookings for "All Bookings" (Confirmed and Completed)
  const filteredBookings = bookings
    .filter((booking) => booking.status === selectedTab && (booking.status === "Confirmed" || booking.status === "Completed"))
    .sort((a, b) => new Date(b.refDateAndTime) - new Date(a.refDateAndTime));

  // Handle saving changes to price and status
  const handleSaveChanges = async () => {
    if (selectedBooking) {
      try {
        const updatedBooking = {
          totalPrice: parseFloat(editedPrice),
          status: editedStatus || selectedBooking.status,
        };

        const response = await fetch(`${BOOKINGS_API_URL}/${selectedBooking.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedBooking),
        });

        if (!response.ok) {
          throw new Error('Failed to update booking');
        }

        // Update the local state
        const updatedBookings = bookings.map((booking) =>
          booking.id === selectedBooking.id
            ? {
                ...booking,
                price: parseFloat(editedPrice),
                status: editedStatus || booking.status,
              }
            : booking
        );
        setBookings(updatedBookings);
        setSelectedBooking({
          ...selectedBooking,
          price: parseFloat(editedPrice),
          status: editedStatus || selectedBooking.status,
        });
        setEditedPrice(null);
        setEditedStatus(null);
        setError('');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-inter">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Bookings</h1>

      {error && (
        <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
          <p className="font-bold text-lg">🚨 Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Section 1: New Bookings (Pending to Confirm only) */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">New Bookings</h2>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {loading ? (
            <p className="p-6 text-gray-600 text-center">Loading bookings...</p>
          ) : newBookings.length > 0 ? (
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
                {loading ? (
                  <tr>
                    <td colSpan="8" className="p-6 text-gray-600 text-center">
                      Loading bookings...
                    </td>
                  </tr>
                ) : filteredBookings.length > 0 ? (
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

        {/* Booking Details Section with Enhanced Styling */}
        {selectedBooking && (
          <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-2 inline-block tracking-tight">
              Booking Details (ID: {selectedBooking.id})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Trip Information */}
              <div className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 text-lg">🗺️</span>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">Trip Type:</span>{" "}
                    <span className="text-gray-800">{selectedBooking.tripType}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 text-lg">📍</span>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">Pick-Up:</span>{" "}
                    <span className="text-gray-800">{selectedBooking.pickUp}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 text-lg">🏁</span>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">Destination:</span>{" "}
                    <span className="text-gray-800">{selectedBooking.destination}</span>
                  </p>
                </div>
                {selectedBooking.flightDetails.arrivalDate && (
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600 text-lg">🛬</span>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">Arrival Date & Time:</span>{" "}
                      <span className="text-gray-800">
                        {selectedBooking.flightDetails.arrivalDate} at {selectedBooking.flightDetails.arrivalTime}
                      </span>
                    </p>
                  </div>
                )}
                {selectedBooking.flightDetails.departureDate && (
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600 text-lg">🛫</span>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">Departure Date & Time:</span>{" "}
                      <span className="text-gray-800">
                        {selectedBooking.flightDetails.departureDate} at {selectedBooking.flightDetails.departureTime}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Vehicle and Edit Options */}
              <div className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 text-lg">🚗</span>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">Vehicle:</span>{" "}
                    <span className="text-gray-800">
                      {selectedBooking.vehicle.category} - {selectedBooking.vehicle.model}
                    </span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 text-lg">👤</span>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">Driver:</span>{" "}
                    <span className="text-gray-800">{selectedBooking.driver}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 text-lg">👥</span>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">Passengers:</span>{" "}
                    <span className="text-gray-800">
                      {selectedBooking.passengers} (Children: {selectedBooking.children})
                    </span>
                  </p>
                </div>
                {/* Editable Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 text-lg">💰</span>
                  <div className="text-sm text-gray-700 flex-1">
                    <span className="font-semibold text-gray-900">Price:</span>{" "}
                    <input
                      type="number"
                      value={editedPrice !== null ? editedPrice : selectedBooking.price}
                      onChange={(e) => setEditedPrice(e.target.value)}
                      className="ml-2 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-32 shadow-sm hover:shadow-md"
                      step="0.01"
                    />
                  </div>
                </div>
                {/* Editable Status */}
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 text-lg">📊</span>
                  <div className="text-sm text-gray-700 flex-1">
                    <span className="font-semibold text-gray-900">Status:</span>{" "}
                    <select
                      value={editedStatus || selectedBooking.status}
                      onChange={(e) => setEditedStatus(e.target.value)}
                      className="ml-2 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-48 shadow-sm hover:shadow-md"
                    >
                      <option value="Pending to Confirm">Pending to Confirm</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                {(selectedBooking.status === "Confirmed" || selectedBooking.status === "Pending to Confirm") &&
                  selectedBooking.comments && (
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-600 text-lg">📝</span>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-gray-900">Adjustments:</span>{" "}
                        <span className="text-gray-600 italic">{selectedBooking.comments}</span>
                      </p>
                    </div>
                  )}
                {/* Save Button */}
                <button
                  onClick={handleSaveChanges}
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
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