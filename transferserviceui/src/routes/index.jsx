import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingLayout from '../layouts/LandingLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Overview from '../pages/Dashboard/Overview';
import Home from '../pages/LandingPage/Home';
import LocationCategories from '../pages/Dashboard/LocationCategories'; 
import Locations from '../pages/Dashboard/Locations'; 
import Drivers from '../pages/Dashboard/Drivers'; 
import Bookings from '../pages/Dashboard/Bookings'; 
import Messeges from '../pages/Dashboard/Messeges'; 

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page Routes */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="reservation" element={<Reservation />} /> */}
        </Route>

        {/* Dashboard Routes */}
        <Route path="/Dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="LocationCategories" element={<LocationCategories />} />
          <Route path="locations" element={<Locations />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="Bookings" element={<Bookings />} />
          <Route path="Messeges" element={<Messeges />} />
        </Route>

        {/* Default route */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;