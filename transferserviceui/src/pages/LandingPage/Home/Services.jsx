// src/Home/Services.jsx
import ServiceCard from '../Components/ServiceCard';

const Services = () => {
  const services = [
    { title: 'Airport Transfers', description: 'We offer well-timed airport transfers.', image: 'https://via.placeholder.com/300' },
    { title: 'Wedding Events', description: 'Combine luxury and celebration.', image: 'https://via.placeholder.com/300' },
    { title: 'Intercity Trips', description: 'Your exclusive intercity chauffeur.', image: 'https://via.placeholder.com/300' },
    { title: 'Business Meetings', description: 'Arrive in style for your meetings.', image: 'https://via.placeholder.com/300' },
  ];

  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} title={service.title} description={service.description} image={service.image} />
        ))}
      </div>
    </section>
  );
};

export default Services;