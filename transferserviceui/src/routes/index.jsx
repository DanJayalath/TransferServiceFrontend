import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingLayout from '../layouts/LandingLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Overview from '../pages/Dashboard/Overview';
import Home from '../pages/LandingPage/Home';
import AboutUs from '../pages/LandingPage/AboutUs';
import ContactUs from "../pages/LandingPage/ContactUs";
import Reservation from "../pages/LandingPage/Reservation";
import AIAssistant from "../pages/LandingPage/AIAssistant";
import Login from '../pages/LandingPage/UserProfile';
import UserProfile from '../pages/LandingPage/UserProfile/UserProfile';
import LocationCategories from '../pages/Dashboard/LocationCategories'; 
import Locations from '../pages/Dashboard/Locations'; 
import Drivers from '../pages/Dashboard/Drivers'; 
import Bookings from '../pages/Dashboard/Bookings'; 
import Messeges from '../pages/Dashboard/Messeges'; 
import Vehicles from '../pages/Dashboard/Vehicles'; 
import LocationRoutes from '../pages/Dashboard/LocationRoutes'; 
import CustomerProfile from '../pages/Dashboard/CustomerProfile'; 

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page Routes */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />
         <Route path="user-profile" element={<Login />} />
         <Route path="userProfile" element={<UserProfile />} />
         <Route path="AboutUs" element={<AboutUs />} />
         <Route path="ContactUs" element={<ContactUs />} />
         <Route path="Reservation" element={<Reservation />} />
         <Route path="AIAssistant" element={<AIAssistant />} />
          {/*  <Route path="contact-us" element={<ContactUs />} />
          <Route path="reservation" element={<Reservation />} /> */}
        </Route>

        {/* Dashboard Routes */}
        <Route path="/Dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="LocationCategories" element={<LocationCategories />} />
          <Route path="locations" element={<Locations />} />
          <Route path="Vehicles" element={<Vehicles />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="LocationRoutes" element={<LocationRoutes />} />
          <Route path="CustomerProfile/:email" element={<CustomerProfile />} />
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