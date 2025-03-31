// pages/LandingPage/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import Services from './Services';
import Fleet from './Fleet';
import WhyChooseUs from './WhyChooseUs';
import SpecialOffer from './SpecialOffer';
import Footer from '../Components/Footer/Footer';

const Home = () => {
  return (
   <>
      <Hero/>
      <Services/>
      <Fleet/>
      <WhyChooseUs/>
      <SpecialOffer/>
      <Footer/>

      
 </>
  );
};

export default Home;