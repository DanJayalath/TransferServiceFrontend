// src/Home/WhyChooseUs.jsx
import ReasonCard from '../Components/ReasonCard';

const WhyChooseUs = () => {
  const reasons = [
    { title: 'Online Booking', description: 'Book your limo easily online.' },
    { title: 'Professional Drivers', description: 'Experienced and courteous drivers.' },
    { title: 'Variety of Car Brands', description: 'Choose from a range of luxury cars.' },
    { title: 'Online Payment', description: 'Secure and convenient payment options.' },
  ];

  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {reasons.map((reason, index) => (
          <ReasonCard key={index} title={reason.title} description={reason.description} />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;