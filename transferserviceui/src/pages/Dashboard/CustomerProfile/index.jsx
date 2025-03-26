import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Sample bookings data (in a real app, this would come from a global state, context, or API)
const bookingsData = [
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
];

export default function CustomerProfile() {
  const { email } = useParams(); // Get the email from the URL
  const navigate = useNavigate();

  // Find the customer and their bookings
  const customer = bookingsData.find((booking) => booking.client.email === email)?.client;
  const customerBookings = bookingsData
    .filter((booking) => booking.client.email === email)
    .sort((a, b) => new Date(b.refDateAndTime) - new Date(a.refDateAndTime));

  const [selectedBooking, setSelectedBooking] = useState(null);

  if (!customer) {
    return <div className="p-6">Customer not found.</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-inter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Customer Profile</h1>
        <button
          onClick={() => navigate("/Dashboard/Bookings")} // Navigate back to Bookings
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
        >
          Back to Bookings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Customer Profile */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 relative overflow-hidden">
          {/* Subtle Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-purple-50 opacity-60"></div>
          <div className="relative z-10 flex flex-col items-center">
            {/* Profile Picture Placeholder */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-500 to-purple-600 flex items-center justify-center mb-4 shadow-md border-4 border-white">
              <span className="text-4xl font-semibold text-white">{customer.name.charAt(0)}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{customer.name}</h2>
            <div className="w-full text-sm text-gray-700 space-y-4">
              {/* Email */}
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l9-6 9 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12l-9 6m9-6l9 6" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a href={`mailto:${customer.email}`} className="text-purple-600 hover:underline">
                    {customer.email}
                  </a>
                </div>
              </div>
              {/* Phone */}
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <a href={`tel:${customer.phone}`} className="text-purple-600 hover:underline">
                    {customer.phone}
                  </a>
                </div>
              </div>
              {/* Country */}
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h18M3 3v18M3 3H1m20 0h2m-2 18v-2M3 21v2m0-2h2m16 0h2M9 7h6m-6 4h6m-6 4h6"
                  />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">Country</p>
                  <p className="text-gray-700">{customer.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Bookings Table and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bookings Table */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 p-4 border-b">Booking History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm font-medium">
                    <th className="p-4 text-left">Booking ID</th>
                    <th className="p-4 text-left">Trip Type</th>
                    <th className="p-4 text-left">Pick-Up</th>
                    <th className="p-4 text-left">Destination</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customerBookings.length > 0 ? (
                    customerBookings.map((booking) => (
                      <tr
                        key={booking.id}
                        onClick={() => setSelectedBooking(booking)}
                        className={`border-t border-gray-200 text-gray-600 text-sm cursor-pointer ${
                          selectedBooking?.id === booking.id ? "bg-blue-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="p-4">{booking.id}</td>
                        <td className="p-4">{booking.tripType}</td>
                        <td className="p-4">{booking.pickUp}</td>
                        <td className="p-4">{booking.destination}</td>
                        <td className="p-4">${booking.price.toFixed(2)}</td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              booking.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "Confirmed"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-6 text-gray-600 text-center">
                        No bookings found for this customer.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Booking Details */}
          {selectedBooking && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
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
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">Price:</span> ${selectedBooking.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">Status:</span> {selectedBooking.status}
                  </p>
                  {(selectedBooking.status === "Confirmed" || selectedBooking.status === "Pending to Confirm") &&
                    selectedBooking.comments && (
                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-gray-900">Adjustments:</span>{" "}
                        <span className="italic">{selectedBooking.comments}</span>
                      </p>
                    )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}