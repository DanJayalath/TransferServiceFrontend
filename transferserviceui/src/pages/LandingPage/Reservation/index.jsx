import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Country list
const countries = [
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'France', code: '+33' },
  { name: 'Germany', code: '+49' },
  { name: 'India', code: '+91' },
];

const Reservation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const numberOptions = Array.from({ length: 14 }, (_, i) => (i + 1).toString());
  const LOCATIONS_API_URL = "https://localhost:7299/api/Locations";
  const VEHICLES_API_URL = "https://localhost:7299/api/Vehicles";
  const BOOKINGS_API_URL = "https://localhost:7299/api/Bookings";
  const RUNWAYS_API_URL = "https://localhost:7299/api/Runways";

  const [bookingDetails, setBookingDetails] = useState({
    tripType: location.state?.bookingDetails.tripType || '',
    pickupLocation: location.state?.bookingDetails.pickupLocation || '',
    dropOffLocation: location.state?.bookingDetails.dropOffLocation || '',
    date: location.state?.bookingDetails.date || '',
    time: location.state?.bookingDetails.time || '',
    passengers: location.state?.bookingDetails.passengers || '',
    handBaggage: location.state?.bookingDetails.handBaggage || '',
    checkedBaggage: location.state?.bookingDetails.checkedBaggage || '',
    arrivalDate: '',
    arrivalTime: '',
    arrivalFlight: '',
    departureDate: '',
    departureTime: '',
    departureFlight: '',
    remarks: '',
  });

  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    email: '',
    country: '',
    telephone: '',
    password: '',
    confirmPassword: '',
  });

  const [locationData, setLocationData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [runwayData, setRunwayData] = useState([]);
  const [error, setError] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('driver');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [showWarningPopup, setShowWarningPopup] = useState(false);

  // Function to calculate and update vehicle prices
  const calculateVehiclePrices = () => {
    setVehicleData(prevVehicleData =>
      prevVehicleData.map(vehicle => {
        let totalPrice = vehicle.vehiclePrice || 0;

        if (
          runwayData.length > 0 &&
          bookingDetails.pickupLocation &&
          bookingDetails.dropOffLocation &&
          bookingDetails.passengers
        ) {
          const matchingRunway = runwayData.find(
            runway =>
              runway.fromLocation.name === bookingDetails.pickupLocation &&
              runway.toLocation.name === bookingDetails.dropOffLocation
          );

          if (matchingRunway) {
            const passengerCount = parseInt(bookingDetails.passengers);
            const priceKey = `pax${passengerCount}Price`;
            const runwayPrice = matchingRunway[priceKey] || 0;
            totalPrice += runwayPrice;
          }
        }

        return {
          ...vehicle,
          newPrice: `${totalPrice.toFixed(2)} EUR`,
        };
      })
    );
  };

  // Fetch data and run price calculation on load
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(LOCATIONS_API_URL);
        if (!response.ok) throw new Error("Failed to fetch locations");
        const rawData = await response.json();

        const groupedLocations = rawData.reduce((acc, location) => {
          const categoryName = location.locationCategory.name;
          const existingCategory = acc.find(cat => cat.category === categoryName);

          if (existingCategory) {
            existingCategory.items.push(location.name);
          } else {
            acc.push({
              category: categoryName,
              items: [location.name],
            });
          }
          return acc;
        }, []);

        setLocationData(groupedLocations);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchVehicles = async () => {
      try {
        const response = await fetch(VEHICLES_API_URL);
        if (!response.ok) throw new Error("Failed to fetch vehicles");
        const rawData = await response.json();

        const mappedVehicles = rawData.map(vehicle => ({
          title: vehicle.vehicleCategory,
          desc: vehicle.vehicleModel || 'Similar model',
          img: vehicle.carImagePath 
            ? `https://localhost:7299/${vehicle.carImagePath}`
            : 'https://media.istockphoto.com/id/1150931120/photo/3d-illustration-of-generic-compact-white-car-front-side-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=xDkyTkz3TF6Wzgr5kADQSZ7dawgt-3iemOoFycHAPiE=',
          maxPassengers: vehicle.maxPassengers,
          maxLuggage: vehicle.maxLuggage,
          vehiclePrice: vehicle.price,
          newPrice: '0.00 EUR',
        }));

        setVehicleData(mappedVehicles);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchRunways = async () => {
      try {
        const response = await fetch(RUNWAYS_API_URL);
        if (!response.ok) throw new Error("Failed to fetch runways");
        const rawData = await response.json();
        setRunwayData(rawData);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchLocations(), fetchVehicles(), fetchRunways()]);
      setLoading(false);
      calculateVehiclePrices();
    };

    fetchData();
  }, []);

  // Recalculate prices when booking details change
  useEffect(() => {
    if (vehicleData.length > 0) {
      calculateVehiclePrices();
    }
  }, [runwayData, bookingDetails.pickupLocation, bookingDetails.dropOffLocation, bookingDetails.passengers, vehicleData]);

  const handleBookingDetailsChange = (e) => {
    const { id, value } = e.target;
    setBookingDetails((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handlePersonalDetailsChange = (e) => {
    const { id, value } = e.target;
    if (id === 'country') {
      const selectedCountry = countries.find(c => c.name === value);
      const phoneCode = selectedCountry ? selectedCountry.code : '';
      setPersonalDetails((prevData) => ({
        ...prevData,
        country: value,
        telephone: phoneCode + (prevData.telephone.replace(/^\+\d+/, '') || ''),
      }));
    } else {
      setPersonalDetails((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleCardDetailsChange = (e) => {
    const { id, value } = e.target;
    setCardDetails((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const isPersonalDetailsComplete = () => {
    return (
      personalDetails.name.trim() !== '' &&
      personalDetails.email.trim() !== '' &&
      personalDetails.country.trim() !== '' &&
      personalDetails.telephone.trim() !== ''
    );
  };

  const isCardDetailsComplete = () => {
    return (
      cardDetails.cardNumber.trim() !== '' &&
      cardDetails.expiry.trim() !== '' &&
      cardDetails.cvv.trim() !== ''
    );
  };

  const handleCarSelect = (car) => {
    if (!isPersonalDetailsComplete()) {
      setShowWarningPopup(true);
      return;
    }
    setError('');
    setSelectedCar(car);
    setShowSummary(true);
  };

  const handleCloseWarningPopup = () => {
    setShowWarningPopup(false);
  };

  const handlePersonalDetailsSubmit = async (e) => {
    e.preventDefault();
    if (personalDetails.password !== personalDetails.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (paymentMethod === 'online' && !isCardDetailsComplete()) {
      setError('Please fill in all card details to proceed with online payment');
      return;
    }

    const reservationData = {
      tripType: bookingDetails.tripType,
      pickupLocation: bookingDetails.pickupLocation,
      dropOffLocation: bookingDetails.dropOffLocation,
      date: bookingDetails.date,
      time: bookingDetails.time,
      passengers: bookingDetails.passengers,
      handBaggage: bookingDetails.handBaggage,
      checkedBaggage: bookingDetails.checkedBaggage,
      arrivalDate: bookingDetails.arrivalDate,
      arrivalTime: bookingDetails.arrivalTime,
      arrivalFlight: bookingDetails.arrivalFlight,
      departureDate: bookingDetails.departureDate,
      departureTime: bookingDetails.departureTime,
      departureFlight: bookingDetails.departureFlight,
      remarks: bookingDetails.remarks,
      name: personalDetails.name,
      email: personalDetails.email,
      country: personalDetails.country,
      telephone: personalDetails.telephone,
      password: personalDetails.password,
      vehicleCategory: selectedCar.title,
      totalPrice: selectedCar.newPrice,
      paymentMethod: paymentMethod,
    };

    try {
      const response = await fetch(BOOKINGS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error('Failed to save booking. Please try again.');
      }

      const result = await response.json();
      setBookingNumber(result.bookingNumber);
      setError('');
      setBookingConfirmed(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBack = () => {
    setShowSummary(false);
    setSelectedCar(null);
    setError('');
  };

  const handleDownloadPDF = () => {
    alert('PDF download functionality will be implemented later!');
  };

  if (!bookingDetails.tripType && !bookingConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex items-center justify-center px-4">
        <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center transform transition-all hover:scale-105">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">No Reservation Found</h2>
          <p className="mb-6 text-gray-600">Please go back and fill out the booking form to create a reservation.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-gray-600 to-gray-800 text-white px-8 py-3 rounded-full hover:from-gray-700 hover:to-gray-900 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-12 px-4">
      {!bookingConfirmed ? (
        <div className="max-w-7xl mx-auto">
          {/* Booking Details Section */}
          {!showSummary && (
            <div className="w-full bg-white p-4 rounded-xl shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-900 tracking-tight border-b-2 border-yellow-500 pb-2 inline-block">Booking Details</h3>
              {loading ? (
                <p className="text-gray-600">Loading data...</p>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="tripType" className="block text-sm font-medium text-gray-700 mb-1">Trip Type</label>
                    <select id="tripType" value={bookingDetails.tripType} onChange={handleBookingDetailsChange} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200" required>
                      <option value="" disabled>Select Trip Type</option>
                      <option value="arrival">Arrival</option>
                      <option value="departure">Departure</option>
                      <option value="roundTrip">Round Trip</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">Pick Up Location</label>
                    <select id="pickupLocation" value={bookingDetails.pickupLocation} onChange={handleBookingDetailsChange} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200" required>
                      <option value="" disabled>Select Location</option>
                      {locationData.map((category, index) => (
                        <optgroup key={index} label={category.category}>
                          {category.items.map((item, itemIndex) => (
                            <option key={itemIndex} value={item}>{item}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dropOffLocation" className="block text-sm font-medium text-gray-700 mb-1">Drop Off Location</label>
                    <select id="dropOffLocation" value={bookingDetails.dropOffLocation} onChange={handleBookingDetailsChange} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200" required>
                      <option value="" disabled>Select Location</option>
                      {locationData.map((category, index) => (
                        <optgroup key={index} label={category.category}>
                          {category.items.map((item, itemIndex) => (
                            <option key={itemIndex} value={item}>{item}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Pick Up Date</label>
                    <input type="date" id="date" value={bookingDetails.date} onChange={handleBookingDetailsChange} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200" required />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Pick Up Time</label>
                    <input type="time" id="time" value={bookingDetails.time} onChange={handleBookingDetailsChange} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200" required />
                  </div>
                  <div>
                    <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                    <select id="passengers" value={bookingDetails.passengers} onChange={handleBookingDetailsChange} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200" required>
                      <option value="" disabled>Select Passengers</option>
                      {numberOptions.map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="handBaggage" className="block text-sm font-medium text-gray-700 mb-1">Hand Baggage</label>
                    <select id="handBaggage" value={bookingDetails.handBaggage} onChange={handleBookingDetailsChange} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200" required>
                      <option value="" disabled>Select Hand Baggage</option>
                      {numberOptions.map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="checkedBaggage" className="block text-sm font-medium text-gray-700 mb-1">Checked Baggage</label>
                    <select id="checkedBaggage" value={bookingDetails.checkedBaggage} onChange={handleBookingDetailsChange} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200" required>
                      <option value="" disabled>Select Checked Baggage</option>
                      {numberOptions.map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Remaining Sections */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Trip Details Section */}
            {!showSummary && (
              <div className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-lg transform transition-all hover:shadow-xl">
                <h3 className="text-2xl font-bold mb-5 text-gray-900 tracking-tight border-b-2 border-yellow-500 pb-2 inline-block">Trip Details</h3>
                <div className="space-y-4">
                  {(bookingDetails.tripType === 'arrival' || bookingDetails.tripType === 'roundTrip') && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Arrival Details</h4>
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 mb-1">Arrival Date</label>
                          <input type="date" id="arrivalDate" value={bookingDetails.arrivalDate} onChange={handleBookingDetailsChange} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200" required />
                        </div>
                        <div>
                          <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700 mb-1">Arrival Time</label>
                          <input type="time" id="arrivalTime" value={bookingDetails.arrivalTime} onChange={handleBookingDetailsChange} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200" required />
                        </div>
                        <div>
                          <label htmlFor="arrivalFlight" className="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
                          <input type="text" id="arrivalFlight" value={bookingDetails.arrivalFlight} onChange={handleBookingDetailsChange} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200" placeholder="e.g., AF1234" />
                        </div>
                      </div>
                    </div>
                  )}
                  {(bookingDetails.tripType === 'departure' || bookingDetails.tripType === 'roundTrip') && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Departure Details</h4>
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                          <input type="date" id="departureDate" value={bookingDetails.departureDate} onChange={handleBookingDetailsChange} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200" required />
                        </div>
                        <div>
                          <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
                          <input type="time" id="departureTime" value={bookingDetails.departureTime} onChange={handleBookingDetailsChange} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200" required />
                        </div>
                        <div>
                          <label htmlFor="departureFlight" className="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
                          <input type="text" id="departureFlight" value={bookingDetails.departureFlight} onChange={handleBookingDetailsChange} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200" placeholder="e.g., AF5678" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div>
                    <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                    <textarea id="remarks" value={bookingDetails.remarks} onChange={handleBookingDetailsChange} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200" rows="3" placeholder="Additional notes or requests"></textarea>
                  </div>
                </div>
              </div>
            )}

            {!showSummary ? (
              <div className="w-full md:w-2/4 space-y-6">
                {loading ? (
                  <p className="text-gray-600">Loading vehicles...</p>
                ) : vehicleData.length > 0 ? (
                  vehicleData.map((car, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between transform transition-all hover:shadow-xl hover:scale-[1.02]">
                      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                        <img src={car.img} alt={car.title} className="w-40 h-20 object-cover rounded-lg shadow-md" />
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900">{car.title}</h4>
                          <p className="text-sm text-gray-600">{car.desc}</p>
                          <div className="flex flex-wrap gap-2 mt-3 text-gray-700 text-sm">
                            <span className="bg-gray-100 px-2 py-1 rounded-full">👤 Max Passengers: {car.maxPassengers}</span>
                            <span className="bg-gray-100 px-2 py-1 rounded-full">🧳 Max Luggage: {car.maxLuggage}</span>
                            <span className="bg-gray-100 px-2 py-1 rounded-full">🤝 Meet & Greet</span>
                            <span className="bg-gray-100 px-2 py-1 rounded-full">🚪 Door-to-door</span>
                            <span className="bg-gray-100 px-2 py-1 rounded-full">🛡️ Porter service</span>
                            <span className="bg-gray-100 px-2 py-1 rounded-full">👶 Free child seats</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center md:text-right mt-4 md:mt-0">
                        <p className="text-xl font-bold text-gray-900">{car.newPrice}</p>
                        <p className="text-xs text-gray-500">Includes VAT & fees</p>
                        <button
                          onClick={() => handleCarSelect(car)}
                          className="mt-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-full hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No vehicles available.</p>
                )}
                {error && (
                  <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md animate-bounce">
                    <p className="font-bold text-lg">🚨 Oops!</p>
                    <p>{error}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full bg-white p-8 rounded-xl shadow-2xl border border-gray-100 transform transition-all hover:shadow-3xl">
                <h3 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight border-b-2 border-yellow-500 pb-2 inline-block">Booking Summary</h3>
                <div className="space-y-8">
                  {/* Booking Details */}
                  <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-yellow-500 pb-2 inline-block">Booking Details</h4>
                    <div className="space-y-3 text-gray-700">
                      <p className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-medium">Trip Type:</span>
                        <span>{bookingDetails.tripType.charAt(0).toUpperCase() + bookingDetails.tripType.slice(1)}</span>
                      </p>
                      <p className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-medium">Pick Up:</span>
                        <span>{bookingDetails.pickupLocation}</span>
                      </p>
                      <p className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-medium">Drop Off:</span>
                        <span>{bookingDetails.dropOffLocation}</span>
                      </p>
                      <p className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-medium">Date:</span>
                        <span>{bookingDetails.date}</span>
                      </p>
                      <p className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-medium">Time:</span>
                        <span>{bookingDetails.time}</span>
                      </p>
                      <p className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-medium">Passengers:</span>
                        <span>{bookingDetails.passengers}</span>
                      </p>
                      <p className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-medium">Hand Baggage:</span>
                        <span>{bookingDetails.handBaggage}</span>
                      </p>
                      <p className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-medium">Checked Baggage:</span>
                        <span>{bookingDetails.checkedBaggage}</span>
                      </p>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-yellow-500 pb-2 inline-block">Trip Details</h4>
                    <div className="space-y-3 text-gray-700">
                      {(bookingDetails.tripType === 'arrival' || bookingDetails.tripType === 'roundTrip') && (
                        <>
                          <p className="flex justify-between border-b border-gray-200 pb-1">
                            <span className="font-medium">Arrival Date:</span>
                            <span>{bookingDetails.arrivalDate}</span>
                          </p>
                          <p className="flex justify-between border-b border-gray-200 pb-1">
                            <span className="font-medium">Arrival Time:</span>
                            <span>{bookingDetails.arrivalTime}</span>
                          </p>
                          <p className="flex justify-between border-b border-gray-200 pb-1">
                            <span className="font-medium">Arrival Flight:</span>
                            <span>{bookingDetails.arrivalFlight || 'N/A'}</span>
                          </p>
                        </>
                      )}
                      {(bookingDetails.tripType === 'departure' || bookingDetails.tripType === 'roundTrip') && (
                        <>
                          <p className="flex justify-between border-b border-gray-200 pb-1">
                            <span className="font-medium">Departure Date:</span>
                            <span>{bookingDetails.departureDate}</span>
                          </p>
                          <p className="flex justify-between border-b border-gray-200 pb-1">
                            <span className="font-medium">Departure Time:</span>
                            <span>{bookingDetails.departureTime}</span>
                          </p>
                          <p className="flex justify-between border-b border-gray-200 pb-1">
                            <span className="font-medium">Departure Flight:</span>
                            <span>{bookingDetails.departureFlight || 'N/A'}</span>
                          </p>
                        </>
                      )}
                      <p className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-medium">Remarks:</span>
                        <span>{bookingDetails.remarks || 'None'}</span>
                      </p>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-yellow-500 pb-2 inline-block">Personal Details</h4>
                    <div className="space-y-3 text-gray-700">
                      <p className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-medium">Full Name:</span>
                        <span>{personalDetails.name}</span>
                      </p>
                      <p className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-medium">Email Address:</span>
                        <span>{personalDetails.email}</span>
                      </p>
                      <p className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-medium">Country:</span>
                        <span>{personalDetails.country}</span>
                      </p>
                      <p className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-medium">Telephone:</span>
                        <span>{personalDetails.telephone}</span>
                      </p>
                    </div>
                  </div>

                  {/* Selected Vehicle */}
                  <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-yellow-500 pb-2 inline-block">Selected Vehicle</h4>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                        <img src={selectedCar.img} alt={selectedCar.title} className="w-32 h-16 object-cover rounded-lg shadow-md border border-gray-200" />
                        <div>
                          <p className="text-lg font-semibold text-gray-900">{selectedCar.title}</p>
                          <p className="text-sm text-gray-600">{selectedCar.desc}</p>
                        </div>
                      </div>
                      <div className="space-y-3 text-gray-700">
                        <p className="flex justify-between border-b border-gray-200 pb-1">
                          <span className="font-medium">Price:</span>
                          <span className="text-green-600 font-semibold">{selectedCar.newPrice}</span>
                        </p>
                        <p className="flex justify-between border-b border-gray-200 pb-1">
                          <span className="font-medium">Max Passengers:</span>
                          <span>{selectedCar.maxPassengers}</span>
                        </p>
                        <p className="flex justify-between border-b border-gray-200 pb-1">
                          <span className="font-medium">Max Luggage:</span>
                          <span>{selectedCar.maxLuggage}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-yellow-500 pb-2 inline-block">Payment Options</h4>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          id="payDriver"
                          name="paymentMethod"
                          value="driver"
                          checked={paymentMethod === 'driver'}
                          onChange={() => setPaymentMethod('driver')}
                          className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300"
                        />
                        <label htmlFor="payDriver" className="text-gray-700 font-medium">Pay at the Driver</label>
                      </div>
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          id="payOnline"
                          name="paymentMethod"
                          value="online"
                          checked={paymentMethod === 'online'}
                          onChange={() => setPaymentMethod('online')}
                          className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300"
                        />
                        <label htmlFor="payOnline" className="text-gray-700 font-medium">Pay Online</label>
                      </div>
                      {paymentMethod === 'online' && (
                        <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                          <h5 className="text-lg font-semibold text-gray-800 mb-3">Online Checkout</h5>
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                              <input
                                type="text"
                                id="cardNumber"
                                value={cardDetails.cardNumber}
                                onChange={handleCardDetailsChange}
                                placeholder="1234 5678 9012 3456"
                                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
                                required
                              />
                            </div>
                            <div className="flex space-x-4">
                              <div className="w-1/2">
                                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                <input
                                  type="text"
                                  id="expiry"
                                  value={cardDetails.expiry}
                                  onChange={handleCardDetailsChange}
                                  placeholder="MM/YY"
                                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
                                  required
                                />
                              </div>
                              <div className="w-1/2">
                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                <input
                                  type="text"
                                  id="cvv"
                                  value={cardDetails.cvv}
                                  onChange={handleCardDetailsChange}
                                  placeholder="123"
                                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {error && <p className="mt-4 text-red-600 text-sm font-medium bg-red-50 p-2 rounded-lg">{error}</p>}
                <div className="mt-8 flex justify-between items-center">
                  <button
                    onClick={handleBack}
                    className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-2 rounded-full hover:from-gray-800 hover:to-black transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                  >
                    <span className="mr-2">←</span> Back to Options
                  </button>
                  <div className="text-right flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-500">Total (VAT & fees included)</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCar.newPrice}</p>
                    </div>
                    <button
                      onClick={handlePersonalDetailsSubmit}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-full hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      {paymentMethod === 'online' ? 'Pay' : 'Confirm Booking'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!showSummary && (
              <div className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-2xl border border-gray-100 transform transition-all hover:shadow-3xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight border-b-2 border-yellow-500 pb-2 inline-block">Personal Details</h3>
                <form className="space-y-4">
                  {[
                    { id: 'name', label: 'Full Name', type: 'text' },
                    { id: 'email', label: 'Email Address', type: 'email' },
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-800 mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        id={field.id}
                        value={personalDetails[field.id]}
                        onChange={handlePersonalDetailsChange}
                        className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                        required
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-800 mb-2">Country</label>
                    <select
                      id="country"
                      value={personalDetails.country}
                      onChange={handlePersonalDetailsChange}
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                      required
                    >
                      <option value="" disabled>Select Country</option>
                      {countries.map((country) => (
                        <option key={country.code} value={country.name}>{country.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-800 mb-2">Telephone</label>
                    <input
                      type="tel"
                      id="telephone"
                      value={personalDetails.telephone}
                      onChange={handlePersonalDetailsChange}
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                      required
                    />
                  </div>
                  {[
                    { id: 'password', label: 'Password', type: 'password' },
                    { id: 'confirmPassword', label: 'Confirm Password', type: 'password' },
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-800 mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        id={field.id}
                        value={personalDetails[field.id]}
                        onChange={handlePersonalDetailsChange}
                        className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                        required
                      />
                      {field.id === 'password' && (
                        <p className="mt-2 text-xs text-gray-600 italic">
                          This will create a user account for you. You can log into your account using your email address and password to see your booking.
                        </p>
                      )}
                    </div>
                  ))}
                </form>
              </div>
            )}
          </div>

          {/* Warning Pop-up */}
          {showWarningPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full transform transition-all">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Warning</h3>
                <p className="text-gray-700 mb-6">Please fill the Personal details before selecting a vehicle</p>
                <div className="flex justify-end">
                  <button
                    onClick={handleCloseWarningPopup}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-full hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Booking Confirmation Section
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Paris Luxury Transfers</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mt-2 border-b-2 border-yellow-500 pb-2 inline-block">Booking Confirmation</h2>
            <p className="text-sm text-gray-600 mt-1">Reservation Confirmed on {new Date().toLocaleDateString()}</p>
            <p className="text-lg font-medium text-gray-800 mt-2">Booking Number: {bookingNumber}</p>
          </div>

          <div className="space-y-8">
            {/* Trip Details */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-yellow-500 pb-2 inline-block">Trip Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <p><span className="font-medium">Trip Type:</span> {bookingDetails.tripType.charAt(0).toUpperCase() + bookingDetails.tripType.slice(1)}</p>
                <p><span className="font-medium">Pick Up Location:</span> {bookingDetails.pickupLocation}</p>
                <p><span className="font-medium">Drop Off Location:</span> {bookingDetails.dropOffLocation}</p>
                <p><span className="font-medium">Date:</span> {bookingDetails.date}</p>
                <p><span className="font-medium">Time:</span> {bookingDetails.time}</p>
                <p><span className="font-medium">Passengers:</span> {bookingDetails.passengers}</p>
                <p><span className="font-medium">Hand Baggage:</span> {bookingDetails.handBaggage}</p>
                <p><span className="font-medium">Checked Baggage:</span> {bookingDetails.checkedBaggage}</p>
                {(bookingDetails.tripType === 'arrival' || bookingDetails.tripType === 'roundTrip') && (
                  <>
                    <p><span className="font-medium">Arrival Date:</span> {bookingDetails.arrivalDate}</p>
                    <p><span className="font-medium">Arrival Time:</span> {bookingDetails.arrivalTime}</p>
                    <p><span className="font-medium">Arrival Flight:</span> {bookingDetails.arrivalFlight || 'N/A'}</p>
                  </>
                )}
                {(bookingDetails.tripType === 'departure' || bookingDetails.tripType === 'roundTrip') && (
                  <>
                    <p><span className="font-medium">Departure Date:</span> {bookingDetails.departureDate}</p>
                    <p><span className="font-medium">Departure Time:</span> {bookingDetails.departureTime}</p>
                    <p><span className="font-medium">Departure Flight:</span> {bookingDetails.departureFlight || 'N/A'}</p>
                  </>
                )}
                <p><span className="font-medium">Remarks:</span> {bookingDetails.remarks || 'None'}</p>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-yellow-500 pb-2 inline-block">Vehicle Details</h3>
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <img src={selectedCar.img} alt={selectedCar.title} className="w-40 h-20 object-cover rounded-lg shadow-md border border-gray-200" />
                <div className="text-gray-700 space-y-2 w-full">
                  <p><span className="font-medium">Vehicle Type:</span> {selectedCar.title}</p>
                  <p><span className="font-medium">Description:</span> {selectedCar.desc}</p>
                  <p><span className="font-medium">Price:</span> {selectedCar.newPrice} (VAT & fees included)</p>
                  <p><span className="font-medium">Max Passengers:</span> {selectedCar.maxPassengers}</p>
                  <p><span className="font-medium">Max Luggage:</span> {selectedCar.maxLuggage}</p>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-yellow-500 pb-2 inline-block">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <p><span className="font-medium">Full Name:</span> {personalDetails.name}</p>
                <p><span className="font-medium">Email Address:</span> {personalDetails.email}</p>
                <p><span className="font-medium">Country:</span> {personalDetails.country}</p>
                <p><span className="font-medium">Telephone:</span> {personalDetails.telephone}</p>
              </div>
            </div>

            {/* Total */}
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">{selectedCar.newPrice}</p>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() => {
                console.log('Back to Home clicked');
                navigate('/');
              }}
              className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-2 rounded-full hover:from-gray-800 hover:to-black transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Back to Home
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-full hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Download as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;