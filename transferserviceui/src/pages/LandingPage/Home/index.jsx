// pages/LandingPage/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';

const Home = () => {
  return (
   <>
      <Navbar/>

      <Link to="/Dashboard/">Go to Dashboard Overview</Link>
 </>
  );
};

export default Home;