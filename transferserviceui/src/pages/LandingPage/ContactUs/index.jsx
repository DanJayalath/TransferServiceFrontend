import React from 'react';
import { Link } from 'react-router-dom';
import './ContactUs.css';
import Hero from './Hero.Jsx';
import ContactForm from './ContactForm.jsx';
import ContactInfo from './ContactInfo.jsx';
import SocialMedia from './SocialMedia.jsx';
import Footer from '../Components/Footer/Footer.jsx';


const AboutUs = () => {
  return (
    <>
    <Hero/>
    <ContactForm/>
    <ContactInfo/>
    <SocialMedia/>
    <Footer/>

    {/* <Link to="/Dashboard/">Go to Dashboard Overview</Link> */}
    </>

  );
};

export default AboutUs;
