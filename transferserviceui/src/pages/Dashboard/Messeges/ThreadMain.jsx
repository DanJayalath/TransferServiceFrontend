import React, { useState, useEffect, useRef } from "react";

export default function ThreadMain({ thread, addMessageToThread }) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [thread?.messages]);

  if (!thread) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <p className="text-gray-500">Select a thread to view messages</p>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    addMessageToThread(thread.id, newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-white font-bold">
                {thread.customer.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{thread.customer.name}</h2>
                <p className="text-sm text-gray-500">{thread.customer.email}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">
              {thread.date} | {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
            <div className="flex space-x-2">
              <button className="p-1 rounded-full hover:bg-gray-100">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Thread Topic */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">{thread.topic}</h3>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-white">
        <div className="space-y-4">
          {thread.messages.map((message, index) => (
            <div key={index} className="text-gray-700">
              <div className={`flex ${message.sender === "Admin" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-lg p-4 rounded-lg ${
                    message.sender === "Admin" ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-base whitespace-pre-line">{message.text}</p>
                  <p className="text-sm text-gray-500 mt-1">{message.timestamp}</p>
                </div>
              </div>
              {index < thread.messages.length - 1 && <hr className="my-4 border-gray-200" />}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Texting Area */}
      <div className="p-6 bg-white border-t border-gray-200">
        <div className="flex space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            placeholder="Type your reply..."
            rows="2"
          />
          <button
            onClick={handleSendMessage}
            className={`px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
              !newMessage.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!newMessage.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}