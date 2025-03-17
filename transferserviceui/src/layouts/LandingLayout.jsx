// layouts/LandingLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet

const LandingLayout = () => {
  return (
    <div className="landing-layout">
      {/* Your landing layout content */}
      <Outlet /> {/* Render child routes here */}
    </div>
  );
};

export default LandingLayout;