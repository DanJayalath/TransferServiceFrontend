import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isMobileMenuOpen, onToggleMobileMenu }) => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo or Brand Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800">
            Paris Easy Move
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Home
            </Link>
            <Link to="/AboutUs" className="text-gray-700 hover:text-blue-600 transition duration-300">
              About Us
            </Link>
            <Link to="/ContactUs" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Contact
            </Link>
            <Link to="/AIAssistant" className="text-gray-700 hover:text-blue-600 transition duration-300">
              AI Assistant
            </Link>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Reservations
            </button>
          </div>

          {/* Login Button */}
          <div className="flex items-center">
            <Link
              to="/user-profile"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
            >
              SIGN IN
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={onToggleMobileMenu} // Use the prop
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMobileMenuOpen} // Use the prop
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} // Use the prop
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-600 transition duration-300"
              onClick={onToggleMobileMenu} // Use the prop
            >
              Home
            </Link>
            <Link
              to="/AboutUs"
              className="block text-gray-700 hover:text-blue-600 transition duration-300"
              onClick={onToggleMobileMenu} // Use the prop
            >
              About Us
            </Link>
            <Link
              to="/ContactUs"
              className="block text-gray-700 hover:text-blue-600 transition duration-300"
              onClick={onToggleMobileMenu} // Use the prop
            >
              Contact
            </Link>
            <Link
              to="/ai-assistant"
              className="block text-gray-700 hover:text-blue-600 transition duration-300"
              onClick={onToggleMobileMenu} // Use the prop
            >
              AI Assistant
            </Link>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Reservations
            </button>
            <Link
              to="/user-profile"
              className="block text-gray-700 hover:text-blue-600 transition duration-300"
              onClick={onToggleMobileMenu} // Use the prop
            >
              SIGN IN
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;