// OurTeam.js
import React from 'react';
import './OurTeam.css';

const OurTeam = () => {
  const teamMembers = [
    { name: 'Nuwin', role: 'Founder & CEO', img: '/Images/AboutUsPage/OurTeam1.jpg' },
    { name: 'Dhanushka', role: 'Technical & IT Manager', img: '/Images/AboutUsPage/OurTeam2.jpg' },
    // { name: 'Mike Johnson', role: 'Lead Driver', img: 'team-member-3.jpg' },
    // { name: 'Sarah Brown', role: 'Customer Service Lead', img: 'team-member-4.jpg' },
  ];

  return (
    <section className="our-team">
      <h2>Meet Our Team</h2>
      <p>We’re a dedicated team of professionals committed to your satisfaction</p>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.img} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;