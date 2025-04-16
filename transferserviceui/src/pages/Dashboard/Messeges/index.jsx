import React, { useState, useEffect } from "react";
import axios from "axios";
import ThreadSidebar from "./ThreadSidebar";
import ThreadMain from "./ThreadMain";

export default function MessageThread() {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get("https://localhost:7299/api/Messages/all");
        setThreads(response.data);
        if (response.data.length > 0) {
          setSelectedThread(response.data[0]);
        }
      } catch (err) {
        setError("Error fetching message threads. Please try again.");
        console.error("Fetch threads error:", err);
      }
    };

    fetchThreads();
  }, []);

  const addMessageToThread = async (threadId, messageText) => {
    try {
      // Placeholder admin user ID; replace with actual admin ID from auth
      const adminUserId = 1; // TODO: Get from logged-in admin
      await axios.post("https://localhost:7299/api/Messages/reply", {
        threadId,
        adminUserId,
        body: messageText,
      });

      // Refresh threads
      const response = await axios.get("https://localhost:7299/api/Messages/all");
      setThreads(response.data);
      const updatedThread = response.data.find((t) => t.threadId === threadId);
      if (updatedThread) {
        setSelectedThread(updatedThread);
      }
    } catch (err) {
      setError("Error sending reply. Please try again.");
      console.error("Reply error:", err);
    }
  };

  if (error) {
    return <div className="text-red-600 text-center p-8">{error}</div>;
  }

  return (
    <div className="w-full h-[90vh] p-2 bg-gray-50">
      <div className="flex h-full border border-gray-200 rounded-lg shadow-sm">
        <ThreadSidebar
          threads={threads}
          selectedThread={selectedThread}
          setSelectedThread={setSelectedThread}
        />
        <ThreadMain thread={selectedThread} addMessageToThread={addMessageToThread} />
      </div>
    </div>
  );
}