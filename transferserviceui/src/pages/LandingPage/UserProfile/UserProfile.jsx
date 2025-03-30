import React, { useState } from 'react';

// Hardcoded user data (for demo purposes)
const userData = {
  name: 'Svetlana Anyukova',
  role: 'Full stack web developer',
  rate: '$44/hr',
  availability: 'Full time (40hr/wk)',
  age: 32,
  location: 'Sankt Petersburg, Russia',
  yearsExperience: 6,
  about:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla molestie sem vitae aliquet sodales. Sed vitae varius felis, eu fringilla fermentum. Nam ullamcorper nulla nec. Id lacinia eros elementum nec. Phasellus placerat turpis id risus elementum, vitae vulputate lectus posuere. Nunc eget massa ligula. Vivamus interdum, tortor et, id scelerisque lectus pretium in.',
  skills: ['UI', 'UX', 'Photoshop', 'C#', 'Illustrator', 'PHP', 'Python', 'Javascript', 'Sketch', 'iOS', 'Android', 'Linux'],
  languages: ['English', 'German', 'French'],
};

// Hardcoded bookings data
const bookingsData = [
  {
    id: 1,
    title: 'Airport Transfer - Paris',
    date: '2025-04-01',
    time: '10:00 AM',
    pickup: 'Charles de Gaulle Airport',
    dropoff: 'Eiffel Tower Hotel',
    status: 'Confirmed',
    price: '$50',
  },
  {
    id: 2,
    title: 'City Tour - Paris',
    date: '2025-04-03',
    time: '2:00 PM',
    pickup: 'Eiffel Tower Hotel',
    dropoff: 'Louvre Museum',
    status: 'Pending',
    price: '$80',
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
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* User Bio Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Profile Picture */}
          <div className="w-24 h-24 rounded-full bg-gray-300 mr-6 mb-4 md:mb-0"></div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
                <p className="text-gray-600">{userData.role}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-gray-800">{userData.rate}</p>
                <p className="text-green-500">{userData.availability}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600">Age: {userData.age}</p>
                <p className="text-gray-600">Location: {userData.location}</p>
                <p className="text-gray-600">Years Experience: {userData.yearsExperience}</p>
              </div>
              <div className="col-span-2">
                <h2 className="text-lg font-semibold text-gray-800">About</h2>
                <p className="text-gray-600">{userData.about}</p>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {userData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800">Languages</h2>
              <div className="flex gap-2 mt-2">
                {userData.languages.map((language, index) => (
                  <span key={index} className="text-gray-600">
                    {language}
                  </span>
                ))}
              </div>
            </div>
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

          {/* Booking Details and Messaging */}
          {selectedBooking && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {selectedBooking.title}
              </h3>
              <p className="text-gray-600">Date: {selectedBooking.date}</p>
              <p className="text-gray-600">Time: {selectedBooking.time}</p>
              <p className="text-gray-600">Pickup: {selectedBooking.pickup}</p>
              <p className="text-gray-600">Dropoff: {selectedBooking.dropoff}</p>
              <p className="text-gray-600">Status: {selectedBooking.status}</p>
              <p className="text-gray-600">Price: {selectedBooking.price}</p>

              {/* Send Message to Admin */}
              <div className="mt-4">
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