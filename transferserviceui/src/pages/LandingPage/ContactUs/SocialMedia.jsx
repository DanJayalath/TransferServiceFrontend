// SocialMedia.js
import React from 'react';
import './SocialMedia.css';

const SocialMedia = () => {
  const socialLinks = [
    { platform: 'Facebook', url: 'https://facebook.com/pariseasymove', icon: '/Images/ContactUsPage/Facebook.jpeg' },
    { platform: 'Instagram', url: 'https://instagram.com/pariseasymove', icon: '/Images/ContactUsPage/Instagram.jpeg' },
    { platform: 'Twitter', url: 'https://twitter.com/pariseasymove', icon: '/Images/ContactUsPage/Twitter.jpeg' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/pariseasymove', icon: '/Images/ContactUsPage/LinkedIn.jpeg' },
  ];

  return (
    <section className="social-media">
      <h2>Follow Us</h2>
      <p>Stay connected with Paris Easy Move on social media.</p>
      <div className="social-links">
        {socialLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
            <img src={link.icon} alt={link.platform} />
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialMedia;