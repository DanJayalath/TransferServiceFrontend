// src/Home/Header.jsx
import Navbar from '../Components/Navbar';
import BookingForm from '../Components/BookingForm';

const Header = () => {
  return (
    <header className="bg-gray-200">
      <div className="flex flex-col md:flex-row items-center justify-between p-8">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Luxury Limo Hire</h1>
          <p className="text-lg mb-6">We offer the professional car rental limousine services.</p>
          <img src="https://via.placeholder.com/600x300" alt="Luxury Car" className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/3 mt-6 md:mt-0">
          <BookingForm />
        </div>
      </div>
    </header>
  );
};

export default Header;