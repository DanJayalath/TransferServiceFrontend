import React from "react";

export default function ThreadSidebar({ threads, selectedThread, setSelectedThread }) {
  return (
    <div className="w-96 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <span className="text-sm font-medium text-gray-700">Customer Messages</span>
      </div>

      {threads.length === 0 ? (
        <p className="text-gray-500 text-sm">No messages yet.</p>
      ) : (
        threads.map((thread) => (
          <div
            key={thread.threadId}
            onClick={() => setSelectedThread(thread)}
            className={`p-4 mb-3 rounded-md cursor-pointer ${
              selectedThread?.threadId === thread.threadId ? "bg-blue-50 border-l-4 border-blue-600" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-white font-bold">
                {thread.messages[0]?.userEmail?.charAt(0).toUpperCase() || "?"}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{thread.messages[0]?.userEmail}</p>
                <p className="text-sm text-gray-500">{thread.subject}</p>
                <p className="text-sm text-gray-500 truncate">Booking: {thread.bookingNumber}</p>
                <p className="text-sm text-gray-500 truncate">{thread.messages[0]?.body}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(thread.messages[0]?.timestamp).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}