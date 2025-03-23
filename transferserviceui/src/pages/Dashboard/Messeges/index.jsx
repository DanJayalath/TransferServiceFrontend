import React, { useState } from "react";
import ThreadSidebar from "./ThreadSidebar";
import ThreadMain from "./ThreadMain";

export default function MessageThread() {
  const [threads, setThreads] = useState([
    {
      id: 1,
      customer: { name: "Mayne Johnston", email: "mayne@example.com" },
      topic: "REVISION DASHBOARD PROFILE",
      date: "27 JUN 2019",
      messages: [
        { sender: "Customer", text: "remembers any changes you make to your files for 30 days...", timestamp: "27 JUN 2019" },
      ],
      attachments: 6,
      starred: false,
    },
    {
      id: 2,
      customer: { name: "Bitzer Design Team", email: "bitzer@example.com" },
      topic: "ADD NEW ILLUSTRATION DESIGN",
      date: "14 JAN 2019",
      messages: [
        { sender: "Customer", text: "There are many variants of passages of loremipsum available...", timestamp: "14 JAN 2019" },
      ],
      attachments: 0,
      starred: true,
    },
    {
      id: 3,
      customer: { name: "Randall Pierce", email: "randall.pierce@vincenzo.org" },
      topic: "INQUIRY WORK REDESIGN WEBSITES",
      date: "09 JUL 2019",
      messages: [
        { sender: "Customer", text: "My former co-worker, Milora agency, suggested that I write to you to inquire about job openings in your graphic design department. I'm a passionate fan Milora agency going back to the days of the Brand X campaign. I'm always excited when something new pops up on your Instagram, and I feel like I can identify [company name]'s work when I encounter it out in the wild. (Bring me in for an interview, and you can test me!)\n\nIn my current job as Lead Graphic Designer for Milora Agency, I manage a team of five or six designers well as act as point person for all our projects. I have extensive experience with Adobe Creative Suite, HTML5, and CSS. I've attached my resume and a few samples from my portfolio, so that you can see my work for yourself.\n\nI'd love a chance to put my skills to work for you. Thank you for your time, and I hope to hear from you.\n\nKind Regards\nEmail Team", timestamp: "09 JUL 2019 03:01PM" },
      ],
      attachments: 2,
      starred: false,
    },
    {
      id: 4,
      customer: { name: "Amazfit Tech Company", email: "amazfit@example.com" },
      topic: "INTRODUCTION NEW TOOLS",
      date: "04 JAN 2019",
      messages: [
        { sender: "Customer", text: "Newtools Australia Pty Ltd has been dedicated to providing high...", timestamp: "04 JAN 2019" },
      ],
      attachments: 0,
      starred: false,
    },
    {
      id: 5,
      customer: { name: "Dribbble", email: "dribbble@example.com" },
      topic: "UPGRADE TO PRO",
      date: "28 JAN 2019",
      messages: [
        { sender: "Customer", text: "Dribbble Pro is the most powerful way to showcase your work...", timestamp: "28 JAN 2019 06:35PM" },
      ],
      attachments: 0,
      starred: true,
    },
  ]);

  const [selectedThread, setSelectedThread] = useState(threads[4]); 

  const addNewThread = (customer, topic, message) => {
    const newThread = {
      id: threads.length + 1,
      customer,
      topic,
      date: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
      messages: [
        { sender: "Customer", text: message, timestamp: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }) + " " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ],
      attachments: 0,
      starred: false,
    };
    setThreads([newThread, ...threads]);
    setSelectedThread(newThread);
  };

  const addMessageToThread = (threadId, messageText) => {
    const updatedThreads = threads.map((thread) => {
      if (thread.id === threadId) {
        return {
          ...thread,
          messages: [
            ...thread.messages,
            {
              sender: "Admin",
              text: messageText,
              timestamp: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }) + " " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ],
        };
      }
      return thread;
    });
    setThreads(updatedThreads);
    setSelectedThread(updatedThreads.find((thread) => thread.id === threadId));
  };

  return (
    <div className="w-full h-[90vh] p-2 bg-gray-100">
      <div className="flex h-full border border-gray-200 rounded-lg shadow-sm">
        <ThreadSidebar
          threads={threads}
          selectedThread={selectedThread}
          setSelectedThread={setSelectedThread}
          addNewThread={addNewThread}
        />
        <ThreadMain thread={selectedThread} addMessageToThread={addMessageToThread} />
      </div>
    </div>
  );
}