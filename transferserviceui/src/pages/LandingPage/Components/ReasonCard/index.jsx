// src/components/ReasonCard.jsx
const ReasonCard = ({ title, description }) => {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl">📍</span> {/* Placeholder icon */}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };
  
  export default ReasonCard;