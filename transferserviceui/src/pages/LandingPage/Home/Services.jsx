// src/Home/Services.jsx
import React from 'react';
import ServiceCard from '../Components/ServiceCard';

const Services = () => {
  const services = [
    {
      title: 'Online Booking',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.',
      image: 'https://plus.unsplash.com/premium_photo-1683120756391-5eded4fd1718?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'City Transport',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.',
      image: 'https://images.unsplash.com/photo-1500039436846-25ae2f11882e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Airport Transport',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.',
      image: 'https://images.unsplash.com/photo-1541674162775-15fd6b6802e3?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'City Tours',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.',
      image: 'https://images.unsplash.com/photo-1581683703690-f2ee757c98bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Regular Transport',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.',
      image: 'https://plus.unsplash.com/premium_photo-1658506638425-25dc93218082?q=80&w=2147&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Tour Transport',
      description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.',
      image: 'https://media.istockphoto.com/id/1695509185/photo/female-chauffeur-helps-a-business-people-to-get-out-of-a-vehicle.jpg?s=612x612&w=0&k=20&c=xo36dIpP54m67CiJMSLQ9rw1v9k-_D_KIVm-MprR-k4=',
    },
  ];

  return (
    <section className="py-16 bg-gray-100 w-full">
      <div className="text-center mb-12">
        <h2 className="text-sm uppercase text-gray-500 tracking-wider mb-2">
          Services
        </h2>
        <h3 className="text-4xl font-bold text-black">
          Our Best Services For You
        </h3>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            image={service.image}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;