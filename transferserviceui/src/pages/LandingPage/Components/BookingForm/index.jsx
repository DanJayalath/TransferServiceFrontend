import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  // Static data for Pick Up and Drop Off Locations (categorized)
  const locationData = [
    {
      category: "Airports",
      items: [
        "Paris Charles de Gaulle Airport",
        "Paris Orly Airport",
        "Lyon-Saint Exupéry Airport",
      ],
    },
    {
      category: "Train Stations",
      items: [
        "Gare du Nord",
        "Gare de Lyon",
        "Gare Montparnasse",
        "Gare de l'Est",
      ],
    },
    {
      category: "Hotels",
      items: [
        "Hilton Paris Opera",
        "Le Meurice",
        "Four Seasons Hotel George V",
        "Shangri-La Hotel Paris",
      ],
    },
    {
      category: "Landmarks",
      items: [
        "Eiffel Tower",
        "Louvre Museum",
        "Notre-Dame Cathedral",
        "Arc de Triomphe",
      ],
    },
  ];

  // Generate options for Passengers, Hand Baggage, and Checked Baggage (1-14)
  const numberOptions = Array.from({ length: 14 }, (_, i) => (i + 1).toString());

  // State to manage form values
  const [formData, setFormData] = useState({
    tripType: '',
    pickupLocation: '',
    dropOffLocation: '',
    date: '',
    time: '',
    passengers: '',
    handBaggage: '',
    checkedBaggage: '',
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the Reservation component and pass the form data
    navigate('/reservation', { state: { bookingDetails: formData } });
  };

  return (
    <div
      className="bg-gradient-to-br from-gray-800/20 to-gray-900/10 backdrop-blur-xl p-6 rounded-xl shadow-2xl w-full max-w-md border border-gray-600/30"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-100 tracking-tight">Book Your Ride</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {/* Trip Type */}
        <div className="col-span-1">
          <label htmlFor="tripType" className="block text-xs font-medium text-gray-200 mb-1">
            Trip Type
          </label>
          <select
            id="tripType"
            value={formData.tripType}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-600/50 rounded-lg bg-gray-800/30 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/70 focus:border-orange-400/70 transition-all duration-300 hover:bg-gray-700/40 text-sm"
            required
          >
            <option value="" disabled>
              Select Trip Type
            </option>
            <option value="arrival" className="bg-gray-700 text-gray-200">
              Arrival
            </option>
            <option value="departure" className="bg-gray-700 text-gray-200">
              Departure
            </option>
            <option value="roundTrip" className="bg-gray-700 text-gray-200">
              Round Trip
            </option>
          </select>
        </div>

        {/* Pick Up Location */}
        <div className="col-span-1">
          <label htmlFor="pickupLocation" className="block text-xs font-medium text-gray-200 mb-1">
            Pick Up Location
          </label>
          <select
            id="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-600/50 rounded-lg bg-gray-800/30 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/70 focus:border-orange-400/70 transition-all duration-300 hover:bg-gray-700/40 text-sm"
            required
          >
            <option value="" disabled>
              Select Location
            </option>
            {locationData.map((category, index) => (
              <optgroup key={index} label={category.category} className="bg-gray-700 text-gray-200">
                {category.items.map((item, itemIndex) => (
                  <option key={itemIndex} value={item} className="bg-gray-700 text-gray-200">
                    {item}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Drop Off Location */}
        <div className="col-span-1">
          <label htmlFor="dropOffLocation" className="block text-xs font-medium text-gray-200 mb-1">
            Drop Off Location
          </label>
          <select
            id="dropOffLocation"
            value={formData.dropOffLocation}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-600/50 rounded-lg bg-gray-800/30 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/70 focus:border-orange-400/70 transition-all duration-300 hover:bg-gray-700/40 text-sm"
            required
          >
            <option value="" disabled>
              Select Location
            </option>
            {locationData.map((category, index) => (
              <optgroup key={index} label={category.category} className="bg-gray-700 text-gray-200">
                {category.items.map((item, itemIndex) => (
                  <option key={itemIndex} value={item} className="bg-gray-700 text-gray-200">
                    {item}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Pick Up Date */}
        <div className="col-span-1">
          <label htmlFor="date" className="block text-xs font-medium text-gray-200 mb-1">
            Pick Up Date
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-600/50 rounded-lg bg-gray-800/30 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/70 focus:border-orange-400/70 transition-all duration-300 hover:bg-gray-700/40 text-sm"
            required
          />
        </div>

        {/* Pick Up Time */}
        <div className="col-span-1">
          <label htmlFor="time" className="block text-xs font-medium text-gray-200 mb-1">
            Pick Up Time
          </label>
          <input
            type="time"
            id="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-600/50 rounded-lg bg-gray-800/30 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/70 focus:border-orange-400/70 transition-all duration-300 hover:bg-gray-700/40 text-sm"
            required
          />
        </div>

        {/* Passengers */}
        <div className="col-span-1">
          <label htmlFor="passengers" className="block text-xs font-medium text-gray-200 mb-1">
            Passengers
          </label>
          <select
            id="passengers"
            value={formData.passengers}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-600/50 rounded-lg bg-gray-800/30 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/70 focus:border-orange-400/70 transition-all duration-300 hover:bg-gray-700/40 text-sm"
            required
          >
            <option value="" disabled>
              Select Passengers
            </option>
            {numberOptions.map((num) => (
              <option key={num} value={num} className="bg-gray-700 text-gray-200">
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Hand Baggage */}
        <div className="col-span-1">
          <label htmlFor="handBaggage" className="block text-xs font-medium text-gray-200 mb-1">
            Hand Baggage
          </label>
          <select
            id="handBaggage"
            value={formData.handBaggage}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-600/50 rounded-lg bg-gray-800/30 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/70 focus:border-orange-400/70 transition-all duration-300 hover:bg-gray-700/40 text-sm"
            required
          >
            <option value="" disabled>
              Select Hand Baggage
            </option>
            {numberOptions.map((num) => (
              <option key={num} value={num} className="bg-gray-700 text-gray-200">
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Checked Baggage */}
        <div className="col-span-1">
          <label htmlFor="checkedBaggage" className="block text-xs font-medium text-gray-200 mb-1">
            Checked Baggage
          </label>
          <select
            id="checkedBaggage"
            value={formData.checkedBaggage}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-600/50 rounded-lg bg-gray-800/30 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/70 focus:border-orange-400/70 transition-all duration-300 hover:bg-gray-700/40 text-sm"
            required
          >
            <option value="" disabled>
              Select Checked Baggage
            </option>
            {numberOptions.map((num) => (
              <option key={num} value={num} className="bg-gray-700 text-gray-200">
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Book Now Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            BOOK NOW →
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;