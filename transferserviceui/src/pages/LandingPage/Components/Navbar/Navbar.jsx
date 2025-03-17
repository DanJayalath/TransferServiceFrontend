import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo or Brand Name */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-gray-800">
              MyBrand
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Home
            </a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 transition duration-300">
              About Us
            </a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Contact
            </a>
            <a href="/ai-assistant" className="text-gray-700 hover:text-blue-600 transition duration-300">
              AI Assistant
            </a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Reservations
            </button>
          </div>

          {/* Login Button */}
          <div className="flex items-center">
            <a
              href="/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
            >
              Login
            </a>
          </div>


          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" className="block text-gray-700 hover:text-blue-600 transition duration-300">
            Home
          </a>
          <a href="/about" className="block text-gray-700 hover:text-blue-600 transition duration-300">
            About Us
          </a>
          <a href="/contact" className="block text-gray-700 hover:text-blue-600 transition duration-300">
            Contact
          </a>
          <a href="/ai-assistant" className="block text-gray-700 hover:text-blue-600 transition duration-300">
            AI Assistant
          </a>
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Reservations
          </button>
          <a href="/login" className="block text-gray-700 hover:text-blue-600 transition duration-300">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;