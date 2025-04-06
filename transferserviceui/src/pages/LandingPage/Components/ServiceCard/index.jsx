
const ServiceCard = ({ title, description, image }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img src={image} alt={title} className="w-full h-40 object-cover rounded mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <button className="mt-4 text-green-500 hover:underline">Learn More</button>
      </div>
    );
  };
  
  export default ServiceCard;