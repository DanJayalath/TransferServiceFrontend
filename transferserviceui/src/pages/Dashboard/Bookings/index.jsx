import React from "react";

// Import Inter font from Google Fonts (you can add this in your index.html or CSS)
const interFontLink = (
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
);

export default function Bookings() {
  // Sample data for bookings (based on the schema)
  const bookings = [
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
  ];

  // Get the latest booking for "New Bookings" section (sorted by refDateAndTime)
  const latestBooking = bookings.sort((a, b) => new Date(b.refDateAndTime) - new Date(a.refDateAndTime))[0];

  return (
    <div className="mt-8 bg-white shadow-lg rounded-xl p-6 font-inter">
      {/* Section 1: New Bookings */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">New Bookings</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Booking ID: {latestBooking.id}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Details */}
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Customer Name:</span> {latestBooking.client.name}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Email:</span>{" "}
                <a href={`mailto:${latestBooking.client.email}`} className="text-blue-600 hover:underline">
                  {latestBooking.client.email}
                </a>
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Phone:</span>{" "}
                <a href={`tel:${latestBooking.client.phone}`} className="text-blue-600 hover:underline">
                  {latestBooking.client.phone}
                </a>
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Country:</span> {latestBooking.client.country}
              </p>
            </div>
            {/* Booking Details */}
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Trip Type:</span> {latestBooking.tripType}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Pick-Up:</span> {latestBooking.pickUp}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Destination:</span> {latestBooking.destination}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Arrival Date & Time:</span>{" "}
                {latestBooking.flightDetails.arrivalDate} at {latestBooking.flightDetails.arrivalTime}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Vehicle:</span> {latestBooking.vehicle.category} -{" "}
                {latestBooking.vehicle.model}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Driver:</span> {latestBooking.driver}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Passengers:</span> {latestBooking.passengers} (Children:{" "}
                {latestBooking.children})
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Price:</span> ${latestBooking.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">Status:</span>{" "}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    latestBooking.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : latestBooking.status === "Confirmed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {latestBooking.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: All Bookings */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-5">All Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
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
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-gray-200 text-gray-600 text-sm hover:bg-gray-50">
                  <td className="p-4">{booking.id}</td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-800">{booking.client.name}</p>
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
                          : booking.status === "Confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}