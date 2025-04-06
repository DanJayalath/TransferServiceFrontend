// src/components/FleetCard.jsx
const FleetCard = ({ name, seats, image }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img src={image} alt={name} className="w-full h-40 object-cover rounded mb-4" />
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600">Seats: {seats}</p>
      </div>
    );
  };
  
  export default FleetCard;