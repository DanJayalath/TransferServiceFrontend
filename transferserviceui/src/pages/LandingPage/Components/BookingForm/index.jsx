import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
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

  // State to store fetched locations
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate options for Passengers, Hand Baggage, and Checked Baggage (1-14)
  const numberOptions = Array.from({ length: 14 }, (_, i) => (i + 1).toString());

  const navigate = useNavigate();

  // Fetch locations from API on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://localhost:7299/api/Locations');
        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }
        const data = await response.json();
        setLocations(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Group locations by category
  const groupedLocations = locations.reduce((acc, location) => {
    const categoryName = location.locationCategory.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(location);
    return acc;
  }, {});

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

  // Render loading or error state
  if (loading) {
    return <div className="text-gray-200">Loading locations...</div>;
  }

  if (error) {
    return <div className="text-red-400">Error: {error}</div>;
  }

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
            {Object.entries(groupedLocations).map(([category, items]) => (
              <optgroup key={category} label={category} className="bg-gray-700 text-gray-200">
                {items.map((location) => (
                  <option
                    key={location.id}
                    value={location.name}
                    className="bg-gray-700 text-gray-200"
                  >
                    {location.name}
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
            {Object.entries(groupedLocations).map(([category, items]) => (
              <optgroup key={category} label={category} className="bg-gray-700 text-gray-200">
                {items.map((location) => (
                  <option
                    key={location.id}
                    value={location.name}
                    className="bg-gray-700 text-gray-200"
                  >
                    {location.name}
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