import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/LandingPage/Components/Navbar'; 

const LandingLayout = () => {
  // State to manage mobile menu visibility (already handled in Navbar, but we can control it here if needed)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(window.innerWidth >= 768);

  // Update mobile menu state based on window width
  const updateMobileMenuState = () => {
    setIsMobileMenuOpen(window.innerWidth >= 768);
  };

  // Add resize event listener to update mobile menu state
  useEffect(() => {
    window.addEventListener('resize', updateMobileMenuState);
    return () => window.removeEventListener('resize', updateMobileMenuState);
  }, []);

  return (
    <div className="flex min-h-screen w-screen bg-gray-100">
      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full">
        {/* Navbar (acting as the header) */}
     <Navbar
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        /> 

        {/* Content Area */}
        <main className="flex-1 p-6">
          <Outlet /> {/* Renders nested landing page routes */}
        </main>
      </div>
    </div>
  );
};

export default LandingLayout;