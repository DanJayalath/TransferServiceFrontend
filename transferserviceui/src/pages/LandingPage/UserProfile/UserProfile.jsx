import React, { useState } from 'react';

// Hardcoded user data (for demo purposes)
const userData = {
  name: 'Svetlana Anyukova',
  country: 'Russia',
  email: 'svetlana.anyukova@example.com',
  phone: '+1234567890',
  password: 'password123', // This would typically be fetched securely from a backend
  profilePicture: null, // Initially null, can be updated
};

// Hardcoded bookings data
const bookingsData = [
  {
    id: 1,
    title: 'Airport Transfer - Paris',
    tripType: 'Departure',
    pickup: 'CDG Airport',
    dropoff: 'Eiffel Tower',
    date: '2025-04-10',
    time: '08:00',
    passengers: '2',
    handBaggage: '2',
    checkedBaggage: '2',
    arrivalTime: '08:00',
    departureTime: '10:00',
    departureDate: '2025-04-10',
    returnTime: 'N/A',
    returnDate: 'N/A',
    user: {
      name: 'Svetlana Anyukova',
      email: 'svetlana.anyukova@example.com',
      phone: '+1234567890',
    },
    vehicle: 'Business Class Van',
    vehicleImage: 'https://via.placeholder.com/150', // Placeholder image
    price: '340 EUR',
    status: 'Confirmed',
  },
  {
    id: 2,
    title: 'City Tour - Paris',
    tripType: 'Round Trip',
    pickup: 'Eiffel Tower Hotel',
    dropoff: 'Louvre Museum',
    date: '2025-04-03',
    time: '14:00',
    passengers: '3',
    handBaggage: '1',
    checkedBaggage: '1',
    arrivalTime: '14:00',
    departureTime: '16:00',
    departureDate: '2025-04-03',
    returnTime: '18:00',
    returnDate: '2025-04-03',
    user: {
      name: 'Svetlana Anyukova',
      email: 'svetlana.anyukova@example.com',
      phone: '+1234567890',
    },
    vehicle: 'Standard Sedan',
    vehicleImage: 'https://via.placeholder.com/150', // Placeholder image
    price: '180 EUR',
    status: 'Pending',
  },
];

// Hardcoded message threads (for demo purposes)
const initialMessages = [
  {
    id: 1,
    topic: 'Issue with Airport Transfer',
    messages: [
      { sender: 'Svetlana', text: 'My driver was late for the airport transfer.', timestamp: '2025-03-29 10:00 AM' },
      { sender: 'Admin', text: 'Apologies for the delay. We’ll look into it.', timestamp: '2025-03-29 10:15 AM' },
    ],
  },
];

const UserProfile = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessageTopic, setNewMessageTopic] = useState('');
  const [newMessageText, setNewMessageText] = useState('');
  const [profilePicture, setProfilePicture] = useState(userData.profilePicture);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showMessageAdmin, setShowMessageAdmin] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle booking selection
  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
  };

  // Handle sending a message to admin
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessageTopic || !newMessageText) return;

    const newMessageThread = {
      id: messages.length + 1,
      topic: newMessageTopic,
      messages: [
        {
          sender: 'Svetlana',
          text: newMessageText,
          timestamp: new Date().toLocaleString(),
        },
      ],
    };

    setMessages([...messages, newMessageThread]);
    setNewMessageTopic('');
    setNewMessageText('');
    setShowMessageAdmin(false); // Hide the form after submission
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle change password form submission
  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (currentPassword !== userData.password) {
      alert("Current password is incorrect!");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // Here you would typically send the new password to the backend
    console.log("New Password:", newPassword);
    setShowChangePassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    alert("Password changed successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* User Bio Section - Updated for Professional Look */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Profile Picture */}
          <div className="relative w-28 h-28 rounded-full bg-gray-200 mr-6 mb-6 md:mb-0 overflow-hidden border-2 border-gray-300 shadow-sm">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            {/* Add/Change Profile Picture */}
            <label className="absolute bottom-0 right-0 bg-gray-300 text-gray-700 p-1.5 rounded-full cursor-pointer hover:bg-gray-400 transition">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
                />
              </svg>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Personal Details */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-sans font-semibold text-gray-800">{userData.name}</h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Country:</span> {userData.country}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {userData.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Telephone:</span> {userData.phone}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Password:</span> {'•'.repeat(userData.password.length)}
                </p>
              </div>
              <div className="flex flex-col items-center md:items-start space-y-2">
                <button
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-400 transition duration-300 shadow-sm hover:shadow-md text-sm"
                >
                  Change Password
                </button>
                <button
                  onClick={() => setShowMessageAdmin(!showMessageAdmin)}
                  className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-400 transition duration-300 shadow-sm hover:shadow-md text-sm"
                >
                  Message Admin
                </button>
              </div>
            </div>

            {/* Change Password Form */}
            {showChangePassword && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
                <h2 className="text-lg font-sans font-medium text-gray-800 mb-2">Change Password</h2>
                <form onSubmit={handleChangePasswordSubmit}>
                  <div className="mb-2">
                    <label
                      htmlFor="currentPassword"
                      className="block text-gray-600 text-sm font-medium mb-1"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      placeholder="Enter current password"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="newPassword"
                      className="block text-gray-600 text-sm font-medium mb-1"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-gray-600 text-sm font-medium mb-1"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-400 transition duration-300 shadow-sm hover:shadow-md text-sm"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowChangePassword(false)}
                      className="bg-gray-400 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-500 transition duration-300 shadow-sm hover:shadow-md text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Message Admin Form */}
            {showMessageAdmin && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
                <h2 className="text-lg font-sans font-medium text-gray-800 mb-2">Message Admin</h2>
                <form onSubmit={handleSendMessage}>
                  <div className="mb-2">
                    <label
                      htmlFor="messageTopic"
                      className="block text-gray-600 text-sm font-medium mb-1"
                    >
                      Topic
                    </label>
                    <input
                      type="text"
                      id="messageTopic"
                      value={newMessageTopic}
                      onChange={(e) => setNewMessageTopic(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      placeholder="Enter message topic"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="messageText"
                      className="block text-gray-600 text-sm font-medium mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="messageText"
                      value={newMessageText}
                      onChange={(e) => setNewMessageText(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      placeholder="Enter your message"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-400 transition duration-300 shadow-sm hover:shadow-md text-sm"
                    >
                      Send
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowMessageAdmin(false)}
                      className="bg-gray-400 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-500 transition duration-300 shadow-sm hover:shadow-md text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bookings List */}
          <div>
            {bookingsData.map((booking) => (
              <div
                key={booking.id}
                onClick={() => handleBookingClick(booking)}
                className={`p-4 mb-2 rounded-lg cursor-pointer ${
                  selectedBooking?.id === booking.id ? 'bg-blue-100' : 'bg-gray-50'
                } hover:bg-blue-50 transition`}
              >
                <h3 className="text-lg font-semibold text-gray-800">{booking.title}</h3>
                <p className="text-gray-600">Date: {booking.date}</p>
                <p className="text-gray-600">Time: {booking.time}</p>
                <p className="text-gray-600">Status: {booking.status}</p>
              </div>
            ))}
          </div>

          {/* Booking Details */}
          {selectedBooking && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h3>

              {/* Trip Summary */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Trip Summary</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-gray-600">Trip Type:</p>
                    <p className="text-gray-800">{selectedBooking.tripType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pick Up:</p>
                    <p className="text-gray-800">{selectedBooking.pickup}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Drop Off:</p>
                    <p className="text-gray-800">{selectedBooking.dropoff}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date:</p>
                    <p className="text-gray-800">{selectedBooking.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Passengers:</p>
                    <p className="text-gray-800">{selectedBooking.passengers}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Hand Baggage:</p>
                    <p className="text-gray-800">{selectedBooking.handBaggage}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Checked Baggage:</p>
                    <p className="text-gray-800">{selectedBooking.checkedBaggage}</p>
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Trip Details</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-gray-600">Arrival Time:</p>
                    <p className="text-gray-800">{selectedBooking.arrivalTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Departure Time:</p>
                    <p className="text-gray-800">{selectedBooking.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Departure Date:</p>
                    <p className="text-gray-800">{selectedBooking.departureDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Return Time:</p>
                    <p className="text-gray-800">{selectedBooking.returnTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Return Date:</p>
                    <p className="text-gray-800">{selectedBooking.returnDate}</p>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Personal Details</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-gray-600">Full Name:</p>
                    <p className="text-gray-800">{selectedBooking.user.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <p className="text-gray-800">{selectedBooking.user.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Telephone:</p>
                    <p className="text-gray-800">{selectedBooking.user.phone}</p>
                  </div>
                </div>
              </div>

              {/* Selected Vehicle */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Selected Vehicle</h4>
                <div className="flex items-center">
                  <img
                    src={selectedBooking.vehicleImage}
                    alt={selectedBooking.vehicle}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <p className="text-gray-800">{selectedBooking.vehicle}</p>
                    <p className="text-gray-600">{selectedBooking.price}</p>
                  </div>
                </div>
              </div>

              {/* Total Cost and Buttons */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-semibold text-gray-800">Total Cost</p>
                  <p className="text-lg font-semibold text-gray-800">{selectedBooking.price}</p>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                  >
                    Back to Bookings
                  </button>
                  <button
                    className={`${
                      selectedBooking.status === 'Confirmed'
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-orange-500 hover:bg-orange-600'
                    } text-white px-4 py-2 rounded-lg transition duration-300`}
                  >
                    {selectedBooking.status}
                  </button>
                </div>
              </div>

              {/* Send Message to Admin */}
              <div className="mt-6">
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  Send Message to Admin
                </h4>
                <form onSubmit={handleSendMessage}>
                  <div className="mb-2">
                    <label
                      htmlFor="messageTopic"
                      className="block text-gray-600 text-sm font-medium mb-1"
                    >
                      Topic
                    </label>
                    <input
                      type="text"
                      id="messageTopic"
                      value={newMessageTopic}
                      onChange={(e) => setNewMessageTopic(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter message topic"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="messageText"
                      className="block text-gray-600 text-sm font-medium mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="messageText"
                      value={newMessageText}
                      onChange={(e) => setNewMessageText(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter your message"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Threads Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Message Threads</h2>
        {messages.length === 0 ? (
          <p className="text-gray-600">No messages yet.</p>
        ) : (
          messages.map((thread) => (
            <div key={thread.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">{thread.topic}</h3>
              <div className="mt-2">
                {thread.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded-lg ${
                      msg.sender === 'Svetlana' ? 'bg-blue-100 text-right' : 'bg-gray-200'
                    }`}
                  >
                    <p className="text-sm text-gray-600">{msg.sender}</p>
                    <p>{msg.text}</p>
                    <p className="text-xs text-gray-500">{msg.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;