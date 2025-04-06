// src/Home/Fleet.jsx
import FleetCard from '../Components/FleetCard';

const Fleet = () => {
  const vehicles = [
    { name: 'Mercedes-Benz S Class', seats: 2, image: 'https://via.placeholder.com/300' },
    { name: 'Mercedes-Benz V Class', seats: 6, image: 'https://via.placeholder.com/300' },
    { name: 'Audi A8', seats: 2, image: 'https://via.placeholder.com/300' },
    { name: 'Rolls-Royce', seats: 2, image: 'https://via.placeholder.com/300' },
  ];

  return (
    <section className="py-12 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Our Fleet</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {vehicles.map((vehicle, index) => (
          <FleetCard key={index} name={vehicle.name} seats={vehicle.seats} image={vehicle.image} />
        ))}
      </div>
    </section>
  );
};

export default Fleet;