import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [bookingsData, setBookingsData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageSubject, setMessageSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [selectedBookingNumber, setSelectedBookingNumber] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        console.log('Fetching user with email:', userEmail);

        if (!userEmail) {
          setError('No user email found. Please log in again.');
          return;
        }

        const userResponse = await axios.get('https://localhost:7299/api/Users');
        console.log('Users API response:', userResponse.data);
        const users = userResponse.data;
        const user = users.find((u) => u.email.toLowerCase() === userEmail.toLowerCase());

        if (user) {
          setUserData({
            name: user.name || 'Unknown',
            country: user.country || 'Unknown',
            email: user.email,
            phone: user.telephone || 'N/A',
          });
        } else {
          setError(`User with email "${userEmail}" not found.`);
          console.log('Available emails:', users.map((u) => u.email));
          return;
        }

        const bookingsResponse = await axios.get(`https://localhost:7299/api/Bookings/by-email/${encodeURIComponent(userEmail)}`);
        console.log('Bookings API response:', bookingsResponse.data);
        const bookings = bookingsResponse.data;

        const transformedBookings = bookings.map((booking) => ({
          id: booking.id,
          title: booking.bookingNumber || `Trip ${booking.id}`,
          tripType: booking.tripType.charAt(0).toUpperCase() + booking.tripType.slice(1),
          pickup: booking.pickupLocation || 'Unknown',
          dropoff: booking.dropOffLocation || 'Unknown',
          date: booking.pickupDateTime.split('T')[0] || new Date().toISOString().split('T')[0],
          time: booking.pickupDateTime.split('T')[1]?.slice(0, 5) || 'N/A',
          passengers: booking.passengers.toString(),
          handBaggage: booking.handBaggage.toString(),
          checkedBaggage: booking.checkedBaggage.toString(),
          arrivalTime: booking.arrivalDateTime ? booking.arrivalDateTime.split('T')[1]?.slice(0, 5) : 'N/A',
          departureTime: booking.departureDateTime ? booking.departureDateTime.split('T')[1]?.slice(0, 5) : 'N/A',
          departureDate: booking.departureDateTime ? booking.departureDateTime.split('T')[0] : 'N/A',
          returnTime: booking.tripType === 'roundTrip' ? booking.departureDateTime?.split('T')[1]?.slice(0, 5) : 'N/A',
          returnDate: booking.tripType === 'roundTrip' ? booking.departureDateTime?.split('T')[0] : 'N/A',
          user: {
            name: booking.name || 'Unknown',
            email: booking.email || 'Unknown',
            phone: booking.telephone || 'N/A',
          },
          vehicle: booking.vehicleModel || 'Unknown Vehicle',
          vehicleImage: 'https://via.placeholder.com/150',
          price: `${booking.totalPrice} EUR`,
          status: booking.status || 'Pending',
        }));

        setBookingsData(transformedBookings);

        const messagesResponse = await axios.get(`https://localhost:7299/api/Messages/by-email/${encodeURIComponent(userEmail)}`);
        console.log('Messages API response:', messagesResponse.data);
        setMessages(messagesResponse.data);
      } catch (err) {
        setError('Error fetching data. Please try again later.');
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, []);

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
  };

  const handleMessageClick = (booking) => {
    setSelectedBookingNumber(booking.title);
    setMessageSubject(`Booking ${booking.title}`);
    setMessageBody('');
    setShowMessageForm(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageSubject || !messageBody) {
      setError('Subject and message body are required.');
      return;
    }

    try {
      const userEmail = localStorage.getItem('userEmail');
      await axios.post('https://localhost:7299/api/Messages', {
        bookingNumber: selectedBookingNumber,
        userEmail,
        subject: messageSubject,
        body: messageBody,
        sender: 'Customer',
        timestamp: new Date().toISOString(),
      });
      setShowMessageForm(false);
      setMessageSubject('');
      setMessageBody('');
      setSelectedBookingNumber('');
      alert('Message sent successfully!');

      const messagesResponse = await axios.get(`https://localhost:7299/api/Messages/by-email/${encodeURIComponent(userEmail)}`);
      setMessages(messagesResponse.data);
    } catch (err) {
      setError('Error sending message. Please try again.');
      console.error('Message send error:', err);
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match!');
      return;
    }
    try {
      await axios.put(`https://localhost:7299/api/Users/${userData.email}/password`, {
        currentPassword,
        newPassword,
      });
      setShowChangePassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('Password changed successfully!');
    } catch (err) {
      setError('Error changing password. Please check your current password.');
      console.error('Password change error:', err);
    }
  };

  if (error) {
    return <div className="text-red-600 text-center p-8 text-lg font-medium">{error}</div>;
  }

  if (!userData) {
    return <div className="text-gray-600 text-center p-8 text-lg font-medium">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-sans font-semibold text-gray-900">{userData.name}</h1>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 text-base">
                  <span className="font-medium">Country:</span> {userData.country}
                </p>
                <p className="text-gray-700 text-base">
                  <span className="font-medium">Email:</span> {userData.email}
                </p>
                <p className="text-gray-700 text-base">
                  <span className="font-medium">Telephone:</span> {userData.phone}
                </p>
                <p className="text-gray-700 text-base">
                  <span className="font-medium">Password:</span> {'•'.repeat(8)}
                </p>
              </div>
              <div className="flex flex-col items-center md:items-start space-y-3">
                <button
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition ease-in-out duration-200 shadow-sm"
                >
                  Change Password
                </button>
              </div>
            </div>

            {showChangePassword && (
              <div className="mt-6 p-6 bg-gray-100 rounded-lg border border-gray-200">
                <h2 className="text-xl font-sans font-semibold text-gray-900 mb-4">Change Password</h2>
                <form onSubmit={handleChangePasswordSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="currentPassword"
                      className="block text-gray-700 text-sm font-medium mb-2"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter current password"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="newPassword"
                      className="block text-gray-700 text-sm font-medium mb-2"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-gray-700 text-sm font-medium mb-2"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                  <div className="flex justify-between space-x-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition ease-in-out duration-200 shadow-sm"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowChangePassword(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition ease-in-out duration-200 shadow-sm"
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

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-sans font-semibold text-gray-900 mb-6">Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {bookingsData.map((booking) => (
              <div
                key={booking.id}
                className={`p-6 mb-4 rounded-lg cursor-pointer ${
                  selectedBooking?.id === booking.id ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                } hover:bg-blue-50 transition ease-in-out duration-200 border border-gray-200`}
              >
                <div onClick={() => handleBookingClick(booking)}>
                  <h3 className="text-lg font-semibold text-gray-900">{booking.title}</h3>
                  <p className="text-gray-700">Date: {booking.date}</p>
                  <p className="text-gray-700">Time: {booking.time}</p>
                  <p className="text-gray-700">Status: {booking.status}</p>
                </div>
                <button
                  onClick={() => handleMessageClick(booking)}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition ease-in-out duration-200 shadow-sm text-sm"
                >
                  Message
                </button>
              </div>
            ))}
          </div>

          {showMessageForm && (
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-xl font-sans font-semibold text-gray-900 mb-4">Send Message</h3>
              <form onSubmit={handleSendMessage}>
                <div className="mb-4">
                  <label
                    htmlFor="messageSubject"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="messageSubject"
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter subject"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="messageBody"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Message Body
                  </label>
                  <textarea
                    id="messageBody"
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your message"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-between space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition ease-in-out duration-200 shadow-sm"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMessageForm(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition ease-in-out duration-200 shadow-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {selectedBooking && !showMessageForm && (
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-xl font-sans font-semibold text-gray-900 mb-6">Booking Summary</h3>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Trip Summary</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Trip Type:</p>
                    <p className="text-gray-900">{selectedBooking.tripType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Pick Up:</p>
                    <p className="text-gray-900">{selectedBooking.pickup}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Drop Off:</p>
                    <p className="text-gray-900">{selectedBooking.dropoff}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Date:</p>
                    <p className="text-gray-900">{selectedBooking.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Passengers:</p>
                    <p className="text-gray-900">{selectedBooking.passengers}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Hand Baggage:</p>
                    <p className="text-gray-900">{selectedBooking.handBaggage}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Checked Baggage:</p>
                    <p className="text-gray-900">{selectedBooking.checkedBaggage}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Trip Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Arrival Time:</p>
                    <p className="text-gray-900">{selectedBooking.arrivalTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Departure Time:</p>
                    <p className="text-gray-900">{selectedBooking.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Departure Date:</p>
                    <p className="text-gray-900">{selectedBooking.departureDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Return Time:</p>
                    <p className="text-gray-900">{selectedBooking.returnTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Return Date:</p>
                    <p className="text-gray-900">{selectedBooking.returnDate}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Personal Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Full Name:</p>
                    <p className="text-gray-900">{selectedBooking.user.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Email:</p>
                    <p className="text-gray-900">{selectedBooking.user.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Telephone:</p>
                    <p className="text-gray-900">{selectedBooking.user.phone}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Selected Vehicle</h4>
                <div className="flex items-center">
                  <img
                    src={selectedBooking.vehicleImage}
                    alt={selectedBooking.vehicle}
                    className="w-16 h-16 object-cover mr-4 rounded-md"
                  />
                  <div>
                    <p className="text-gray-900">{selectedBooking.vehicle}</p>
                    <p className="text-gray-700">{selectedBooking.price}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-semibold text-gray-900">Total Cost</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedBooking.price}</p>
                </div>
                <div className="flex justify-between space-x-4">
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition ease-in-out duration-200 shadow-sm"
                  >
                    Back to Bookings
                  </button>
                  <button
                    className={`${
                      selectedBooking.status === 'Confirmed'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-orange-600 hover:bg-orange-700'
                    } text-white px-4 py-2 rounded-md transition ease-in-out duration-200 shadow-sm`}
                  >
                    {selectedBooking.status}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-sans font-semibold text-gray-900 mb-6">Messages</h2>
        {messages.length === 0 ? (
          <p className="text-gray-700">No messages yet.</p>
        ) : (
          messages.map((thread) => (
            <div key={thread.threadId} className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{thread.subject}</h3>
              <p className="text-gray-700 mb-3">Booking: {thread.bookingNumber}</p>
              <div className="space-y-4">
                {thread.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-md ${
                      msg.sender === 'Customer' ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'
                    }`}
                  >
                    <p className="text-sm text-gray-600">{msg.sender}</p>
                    <p className="text-gray-900">{msg.body}</p>
                    <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</p>
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