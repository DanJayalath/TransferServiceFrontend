import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import DashboardContent from "../Components/DashboardContent";

export default function DashboardOverview() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  const updateSidebarState = () => {
    setIsSidebarOpen(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateSidebarState);
    return () => window.removeEventListener("resize", updateSidebarState);
  }, []);

  return (
    <div className="flex min-h-screen w-screen bg-gray-100">
      {/* Sidebar with controlled visibility and onClose handler */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col w-full">
        {/* Header with toggle functionality */}
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main content area */}
        <main className="flex-1 p-6">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}