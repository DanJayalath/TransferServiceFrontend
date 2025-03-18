import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom"; // Add Outlet
import Sidebar from "../pages/Dashboard/Components/Sidebar";
import Header from "../pages/Dashboard/Components/Header";

export default function DashboardLayout() {
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
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Content Area */}
        <main className="flex-1 p-6">
          <Outlet /> {/* Renders nested dashboard routes */}
        </main>
      </div>
    </div>
  );
}