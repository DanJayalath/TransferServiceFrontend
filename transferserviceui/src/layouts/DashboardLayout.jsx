// layouts/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      {/* Your dashboard layout content */}
      <Outlet /> {/* Render child routes here */}
    </div>
  );
};

export default DashboardLayout;