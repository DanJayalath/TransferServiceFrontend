// routes/index.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes instead of Switch
import LandingLayout from '../layouts/LandingLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Overview from '../pages/Dashboard/Overview';
import Home from '../pages/LandingPage/Home';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page Routes */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />
       {/*    <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="reservation" element={<Reservation />} /> */}
          {/* Add other landing page routes here */}
        </Route>

        {/* Dashboard Routes */}
        <Route path="/Dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          {/* Add other dashboard routes here */}
        </Route>

        {/* Default route */}
      {/*   <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;