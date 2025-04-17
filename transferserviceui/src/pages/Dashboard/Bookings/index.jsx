import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Bookings() {
  const BOOKINGS_API_URL = "https://localhost:7299/api/Bookings";
  const MESSAGES_API_URL = "https://localhost:7299/api/Messages";

  // State for bookings, selected tab, selected booking, search, pagination, and messaging
  const [bookings, setBookings] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editedPrice, setEditedPrice] = useState(null);
  const [editedStatus, setEditedStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState(null);
  const [messageSubject, setMessageSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");

  const bookingsPerPage = 10;

  // Fetch bookings from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await fetch(BOOKINGS_API_URL);
        if (!response.ok) throw new Error(`Failed to fetch bookings: ${response.statusText}`);
        const data = await response.json();

        // Map the API data to the format expected by the component
        const mappedBookings = data.map((booking) => ({
          id: booking.id || 0,
          bookingNumber: booking.bookingNumber || `BN${booking.id}` || "N/A",
          client: {
            name: booking.name || "Unknown",
            email: booking.email || "N/A",
            phone: booking.telephone || "N/A",
            country: booking.country || "N/A",
          },
          tripType:
            booking.tripType && typeof booking.tripType === "string"
              ? booking.tripType.charAt(0).toUpperCase() + booking.tripType.slice(1)
              : "Unknown",
          pickUp: booking.pickupLocation || "N/A",
          destination: booking.dropOffLocation || "N/A",
          pickupDateTime: booking.pickupDateTime
            ? new Date(booking.pickupDateTime).toLocaleString()
            : "N/A",
          passengers: booking.passengers || 0,
          handBaggage: booking.handBaggage ?? 0, // Use ?? to ensure null/undefined becomes 0
          checkedBaggage: booking.checkedBaggage ?? 0,
          flightDetails: {
            arrivalDate: booking.arrivalDateTime
              ? new Date(booking.arrivalDateTime).toLocaleDateString()
              : "N/A",
            arrivalTime: booking.arrivalDateTime
              ? new Date(booking.arrivalDateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A",
            arrivalFlight: booking.arrivalFlight || "N/A",
            departureFlight: booking.departureFlight || "N/A",
          },
          vehicle: {
            category: booking.vehicleCategory || "N/A",
            model: booking.vehicleModel || "N/A",
          },
          price: booking.totalPrice || 0,
          status: booking.status || "Unknown",
          remarks: booking.remarks || "None",
          createdAt: booking.createdAt
            ? new Date(booking.createdAt).toLocaleString()
            : "N/A",
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

  // Filter bookings based on search query
  const filteredBySearch = bookings.filter((booking) =>
    searchQuery
      ? booking.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.bookingNumber.toString().toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  // Filter bookings for "New Bookings" (Pending to Confirm only)
  const newBookings = filteredBySearch
    .filter((booking) => booking.status === "Pending to Confirm")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Filter bookings for "All Bookings" (All, Confirmed, Completed, Cancelled, Pending to Confirm)
  const filteredBookings =
    selectedTab === "All"
      ? filteredBySearch.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : filteredBySearch
          .filter((booking) => booking.status === selectedTab)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Pagination logic
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedBooking(null);
  };

  // Handle saving changes to price and status
  const handleSaveChanges = async () => {
    if (!selectedBooking) return;

    try {
      const updatedBooking = {
        totalPrice: parseFloat(editedPrice),
        status: editedStatus || selectedBooking.status,
      };

      const response = await fetch(`${BOOKINGS_API_URL}/${selectedBooking.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBooking),
      });

      if (!response.ok) {
        throw new Error(`Failed to update booking: ${response.statusText}`);
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
      setError("");
      setSuccessMessage("Booking updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle opening the message form
  const openMessageForm = (booking) => {
    setMessageRecipient(booking);
    setMessageSubject("");
    setMessageBody("");
    setShowMessageForm(true);
    setError("");
    setSuccessMessage("");
  };

  // Handle sending the message via API
  const sendMessage = async () => {
    if (!messageRecipient) {
      setError("No recipient selected. Please try again.");
      return;
    }
    if (!messageSubject.trim() || !messageBody.trim()) {
      setError("Please enter both a subject and a message.");
      return;
    }
    if (messageRecipient.client.email === "N/A" || !messageRecipient.client.email.includes("@")) {
      setError("Recipient email is invalid.");
      return;
    }
    if (messageRecipient.bookingNumber === "N/A") {
      setError("Booking number is invalid.");
      return;
    }

    try {
      const messageData = {
        bookingNumber: messageRecipient.bookingNumber.toString(),
        userEmail: messageRecipient.client.email,
        subject: messageSubject,
        body: messageBody,
        sender: "Admin",
        timestamp: new Date().toISOString(),
      };

      console.log("Sending message to API:", MESSAGES_API_URL);
      console.log("Request body:", JSON.stringify(messageData, null, 2));

      const response = await fetch(MESSAGES_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      console.log("Response status:", response.status);
      console.log("Response status text:", response.statusText);

      if (!response.ok) {
        let errorMessage = `Failed to send message: ${response.statusText} (${response.status})`;
        try {
          const errorData = await response.json();
          console.log("Error response body:", errorData);
          if (errorData.message || errorData.errors) {
            errorMessage += ` - ${errorData.message || JSON.stringify(errorData.errors)}`;
          }
        } catch (jsonError) {
          console.log("Failed to parse error response as JSON");
        }
        throw new Error(errorMessage);
      }

      const responseData = await response.json().catch(() => ({}));
      console.log("Success response body:", responseData);

      setShowMessageForm(false);
      setMessageRecipient(null);
      setMessageSubject("");
      setMessageBody("");
      setError("");
      setSuccessMessage("Message sent successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Message sending error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-inter">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Bookings</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by email, booking number, or name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
          <p className="font-bold text-lg">Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md">
          <p className="font-bold text-lg">Success</p>
          <p>{successMessage}</p>
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
                    <th className="p-4 text-left">Booking Number</th>
                    <th className="p-4 text-left">Customer</th>
                    <th className="p-4 text-left">Trip Type</th>
                    <th className="p-4 text-left">Pick-Up</th>
                    <th className="p-4 text-left">Destination</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Actions</th>
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
                      <td className="p-4">{booking.bookingNumber}</td>
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
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openMessageForm(booking);
                          }}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-all duration-200"
                        >
                          Message
                        </button>
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

      {/* Section 2: All Bookings with Tabs */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-5">All Bookings</h2>
        {/* Tabs */}
        <div className="flex space-x-4 mb-5">
          {["All", "Pending to Confirm", "Confirmed", "Completed", "Cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setSelectedTab(tab);
                setSelectedBooking(null);
                setCurrentPage(1);
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
                  <th className="p-4 text-left">Booking Number</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Trip Type</th>
                  <th className="p-4 text-left">Pick-Up</th>
                  <th className="p-4 text-left">Destination</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Adjustments</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="p-6 text-gray-600 text-center">
                      Loading bookings...
                    </td>
                  </tr>
                ) : currentBookings.length > 0 ? (
                  currentBookings.map((booking) => (
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
                      <td className="p-4">{booking.bookingNumber}</td>
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
                              : booking.status === "Confirmed"
                              ? "bg-blue-100 text-blue-700"
                              : booking.status === "Pending to Confirm"
                              ? "bg-yellow-100 text-yellow-700"
                              : booking.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {(booking.status === "Confirmed" || booking.status === "Pending to Confirm") &&
                        booking.remarks ? (
                          <span className="text-gray-600 italic">{booking.remarks}</span>
                        ) : (
                          <span className="text-gray-400">No adjustments</span>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openMessageForm(booking);
                          }}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-all duration-200"
                        >
                          Message
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="p-6 text-gray-600 text-center">
                      No bookings found for this status.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* Message Form */}
        {showMessageForm && messageRecipient && (
          <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Send Message to {messageRecipient.client.name} ({messageRecipient.client.email})
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                  placeholder="Enter message subject..."
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                  rows="5"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowMessageForm(false);
                    setMessageRecipient(null);
                    setMessageSubject("");
                    setMessageBody("");
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Details Section */}
      {selectedBooking && (
        <>
          {console.log("Baggage details:", selectedBooking.handBaggage, selectedBooking.checkedBaggage)}
          <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              Booking Details (Number: {selectedBooking.bookingNumber})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Booking, Client, and Trip Information */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">
                    Booking Information
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Booking Number:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.bookingNumber}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">ID:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.id}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Created At:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.createdAt}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">
                    Client Information
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Name:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.client.name}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Email:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.client.email}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Phone:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.client.phone}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Country:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.client.country}</span>
                    </p>
                  </div>
                </div>

                <div className="min-h-fit overflow-visible">
                  <h4 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">
                    Trip Information
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Trip Type:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.tripType}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Pick-Up Location:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.pickUp}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Drop-Off Location:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.destination}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Pick-Up Date & Time:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.pickupDateTime}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Passengers:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.passengers}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Hand Baggage:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.handBaggage}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Checked Baggage:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.checkedBaggage}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Flight, Vehicle, Pricing, and Status */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">
                    Flight Information
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Arrival Date & Time:</span>{" "}
                      <span className="text-gray-800">
                        {selectedBooking.flightDetails.arrivalDate} at{" "}
                        {selectedBooking.flightDetails.arrivalTime}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Arrival Flight:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.flightDetails.arrivalFlight}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Departure Flight:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.flightDetails.departureFlight}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">
                    Vehicle Information
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Vehicle Category:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.vehicle.category}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Vehicle Model:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.vehicle.model}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">
                    Pricing and Status
                  </h4>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">Total Price:</span>{" "}
                      <input
                        type="number"
                        value={editedPrice !== null ? editedPrice : selectedBooking.price}
                        onChange={(e) => setEditedPrice(e.target.value)}
                        className="ml-2 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-32"
                        step="0.01"
                      />
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">Status:</span>{" "}
                      <select
                        value={editedStatus || selectedBooking.status}
                        onChange={(e) => setEditedStatus(e.target.value)}
                        className="ml-2 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-48"
                      >
                        <option value="Pending to Confirm">Pending to Confirm</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Remarks:</span>{" "}
                      <span className="text-gray-800">{selectedBooking.remarks}</span>
                    </p>
                  </div>
                </div>
                {/* Save Button */}
                <button
                  onClick={handleSaveChanges}
                  disabled={editedPrice === null && editedStatus === null}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}