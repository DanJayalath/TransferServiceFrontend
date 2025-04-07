import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Placeholder images for cars
const businessClassCar = 'https://media.istockphoto.com/id/1150931120/photo/3d-illustration-of-generic-compact-white-car-front-side-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=xDkyTkz3TF6Wzgr5kADQSZ7dawgt-3iemOoFycHAPiE=';
const businessVan = 'https://media.istockphoto.com/id/1150931120/photo/3d-illustration-of-generic-compact-white-car-front-side-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=xDkyTkz3TF6Wzgr5kADQSZ7dawgt-3iemOoFycHAPiE=';
const firstClassCar = 'https://media.istockphoto.com/id/1150931120/photo/3d-illustration-of-generic-compact-white-car-front-side-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=xDkyTkz3TF6Wzgr5kADQSZ7dawgt-3iemOoFycHAPiE=';

// Country list with phone codes (simplified for brevity, add more as needed)
const countries = [
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'France', code: '+33' },
  { name: 'Germany', code: '+49' },
  { name: 'India', code: '+91' },
  // Add more countries here...
];

const Reservation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const locationData = [
    { category: "Airports", items: ["Paris Charles de Gaulle Airport", "Paris Orly Airport", "Lyon-Saint Exupéry Airport"] },
    { category: "Train Stations", items: ["Gare du Nord", "Gare de Lyon", "Gare Montparnasse", "Gare de l'Est"] },
    { category: "Hotels", items: ["Hilton Paris Opera", "Le Meurice", "Four Seasons Hotel George V", "Shangri-La Hotel Paris"] },
    { category: "Landmarks", items: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Arc de Triomphe"] },
  ];

  const numberOptions = Array.from({ length: 14 }, (_, i) => (i + 1).toString());

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

  const [error, setError] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

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

  const isPersonalDetailsComplete = () => {
    return (
      personalDetails.name.trim() !== '' &&
      personalDetails.email.trim() !== '' &&
      personalDetails.country.trim() !== '' &&
      personalDetails.telephone.trim() !== ''
    );
  };

  const handleCarSelect = (car) => {
    if (!isPersonalDetailsComplete()) {
      setError('Please fill in your personal details to select a car!');
      return;
    }
    setError('');
    setSelectedCar(car);
    setShowSummary(true);
  };

  const handlePersonalDetailsSubmit = (e) => {
    e.preventDefault();
    if (personalDetails.password !== personalDetails.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const reservationData = { ...bookingDetails, ...personalDetails, selectedCar };
    console.log('Reservation Data to be saved:', reservationData);

    const isSuccess = Math.random() > 0.2; // 80% success rate
    if (isSuccess) {
      setError('');
      setBookingConfirmed(true);
    } else {
      setError('Failed to save booking. Please try again.');
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
          {/* Booking Details Section (Reduced Height) */}
          {!showSummary && (
            <div className="w-full bg-white p-4 rounded-xl shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-900 tracking-tight border-b-2 border-yellow-500 pb-2 inline-block">Booking Details</h3>
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
                {[
                  { title: 'Business Class Car', desc: 'Mercedes-Benz E-Class or similar', img: businessClassCar, maxPassengers: 3, maxLuggage: 2, newPrice: '330 EUR' },
                  { title: 'Business Class Van', desc: 'Mercedes-Benz V-Class or similar', img: businessVan, maxPassengers: 6, maxLuggage: 8, newPrice: '340 EUR' },
                  { title: 'First Class Car', desc: 'Mercedes-Benz S-Class or similar', img: firstClassCar, maxPassengers: 3, maxLuggage: 2, newPrice: '400 EUR' },
                ].map((car, index) => (
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
                        disabled={!isPersonalDetailsComplete()}
                        className={`mt-3 bg-gradient-to-r ${isPersonalDetailsComplete() ? 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700' : 'from-gray-400 to-gray-500 cursor-not-allowed'} text-white px-6 py-2 rounded-full transition-all duration-300 shadow-md ${isPersonalDetailsComplete() ? 'hover:shadow-lg' : ''}`}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
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
                      Confirm Booking
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
        </div>
      ) : (
        // Booking Confirmation Section
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Paris Luxury Transfers</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mt-2 border-b-2 border-yellow-500 pb-2 inline-block">Booking Confirmation</h2>
            <p className="text-sm text-gray-600 mt-1">Reservation Confirmed on {new Date().toLocaleDateString()}</p>
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
              onClick={() => navigate('/')}
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