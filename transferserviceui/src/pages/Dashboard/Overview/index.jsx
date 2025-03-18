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
    <div className="flex min-h-screen">
      {/* Pass `isSidebarOpen` to control visibility */}
      <Sidebar isOpen={isSidebarOpen} />

      <div className={`flex-1 flex flex-col w-full md:flex-row`}>
        {/* Pass `setIsSidebarOpen` to toggle sidebar */}
        <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="p-6 w-full">
          <DashboardContent />
        </main>
    
      </div>
    </div>
  );
}