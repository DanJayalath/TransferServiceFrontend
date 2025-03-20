import React, { useState } from "react";

export default function ThreadSidebar({ threads, selectedThread, setSelectedThread, addNewThread }) {
  const [isNewThreadOpen, setIsNewThreadOpen] = useState(false);
  const [newTopic, setNewTopic] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTopic.trim() || !newMessage.trim() || !customerName.trim() || !customerEmail.trim()) return;

    const customer = { name: customerName, email: customerEmail };
    addNewThread(customer, newTopic.toUpperCase(), newMessage);
    setNewTopic("");
    setNewMessage("");
    setCustomerName("");
    setCustomerEmail("");
    setIsNewThreadOpen(false);
  };

  return (
    <div className="w-96 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Recent</span>
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <button
        onClick={() => setIsNewThreadOpen(true)}
        className="w-full mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
      >
        + New Thread
      </button>

      {isNewThreadOpen && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-md">
          <div className="mb-3">
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Your Name"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Topic"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-3">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Your Message"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Send
            </button>
            <button
              type="button"
              onClick={() => setIsNewThreadOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {threads.map((thread) => (
        <div
          key={thread.id}
          onClick={() => setSelectedThread(thread)}
          className={`p-4 mb-3 rounded-md cursor-pointer ${
            selectedThread?.id === thread.id ? "bg-blue-50 border-l-4 border-blue-500" : "hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-white font-bold">
              {thread.customer.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{thread.customer.name}</p>
              <p className="text-sm text-gray-500">{thread.topic}</p>
              <p className="text-sm text-gray-500 truncate">{thread.messages[0]?.text}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{thread.date}</p>
              <div className="flex items-center space-x-1 mt-1">
                {thread.attachments > 0 && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 00-5.656-5.656L5.757 10.757a6 6 0 108.486 8.486L20.828 12"
                      />
                    </svg>
                    <span className="text-sm text-gray-500">{thread.attachments}</span>
                  </div>
                )}
                {thread.starred && (
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}