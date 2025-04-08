import BookingForm from '../BookingForm';
import backgroundImage from '../Images/headerimage.jpg';

const Header = () => {
  return (
    <header
      className="bg-gray-200 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginTop: -25,
        padding: 0,
        minHeight: '700px',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center', // Changed to 'center' to bring sections closer
        alignItems: 'center',
        padding: '0 1rem',
        gap: '1rem', // Added gap to fine-tune spacing between sections
      }}
    >
      {/* Left Side: Booking Form */}
      <div className="flex-[0.7] flex justify-end">
        <div className="max-w-md">
          <BookingForm />
        </div>
      </div>

      {/* Center Middle: Title, Description, and Buttons */}
      <div className="flex-1 text-center text-white">
        <h2 className="text-lg md:text-xl mb-2">WELCOME TO PARIS EASY MOVE!</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">BOOK YOUR RIDE</h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Experience premium Paris chauffeur service offering professional, reliable, and stylish transportation for airport transfers, city tours, business travel, and VIP clients.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 hover:shadow-lg transition duration-200 shadow-md">
            ABOUT MORE →
          </button>

        </div>
      </div>

      {/* Right Side: Creative AI Integration Element */}
      <div className="flex-[0.7] flex justify-start">
        <div className="text-center text-white max-w-sm">
          <div className="relative">
            {/* AI Icon/Graphic Placeholder */}
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
            {/* Glowing Effect */}
            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-blue-500/30 blur-xl animate-pulse"></div>
          </div>
          <h3 className="text-2xl font-semibold mb-2">Powered by AI</h3>
          <p className="text-sm">
            Smarter rides with AI-driven route optimization, real-time tracking, and personalized recommendations.
          </p>
        </div>
      </div>

      {/* Chat Button in Bottom Right */}
      <div className="absolute bottom-8 right-8 flex items-center space-x-3">
        <div className="relative bg-gray-700/90 text-gray-100 text-sm px-4 py-2 rounded-full shadow-lg">
          Say “Hello!” and Get your DISCOUNT
          {/* Glow Effect for Say Hello */}
          <div className="absolute inset-0 rounded-full bg-white/20 blur-md animate-pulse"></div>
        </div>
        <button className="relative bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition duration-200 shadow-lg">
          START CHAT
          {/* Glow Effect for Start Chat */}
          <div className="absolute inset-0 rounded-full bg-white/30 blur-lg animate-pulse"></div>
        </button>
      </div>
    </header>
  );
};

export default Header;