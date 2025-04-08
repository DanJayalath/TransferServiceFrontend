import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isMobileMenuOpen, onToggleMobileMenu }) => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo or Brand Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-black">
              Paris Easy Move
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-6">
            <Link to="/" className="text-black hover:scale-110 transition-transform duration-300">
              Home
            </Link>
            <Link to="/AboutUs" className="text-black hover:scale-110 transition-transform duration-300">
              About Us
            </Link>
            <Link to="/ContactUs" className="text-black hover:scale-110 transition-transform duration-300">
              Contact
            </Link>
            <Link to="/StreetView" className="text-black hover:scale-110 transition-transform duration-300">
              Street View
            </Link>
            {/* Added Traffic Info Link */}
            <Link to="/TrafficInfo" className="text-black hover:scale-110 transition-transform duration-300">
              Traffic Info
            </Link>
          </div>

          {/* Right Side - AI Assistant and Sign In */}
          <div className="hidden md:flex items-center space-x-4">
            {/* AI Assistant with futuristic styling */}
            <Link 
              to="/AIAssistant" 
              className="group relative flex items-center text-black font-bold hover:text-gray-700 transition duration-300 hover:shadow-[0_0_8px_rgba(0,0,0,0.3)] hover:border hover:border-purple-600 hover:rounded-lg hover:px-2 hover:py-1"
            >
              <span className="relative font-futura tracking-wide">
                AI Assistant
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </span>
              <span className="ml-2 relative">
                <svg 
                  className="w-5 h-5 animate-pulse text-purple-600 group-hover:text-purple-800"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                  <circle 
                    cx="12" 
                    cy="12" 
                    r="3" 
                    className="animate-ping opacity-25 group-hover:opacity-50" 
                    fill="currentColor"
                  />
                </svg>
                <span className="absolute inset-0 bg-purple-600 rounded-full opacity-0 group-hover:opacity-20 animate-ping"></span>
              </span>
            </Link>

            {/* Styled Sign In */}
            <Link
              to="/user-profile"
              className="relative inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white bg-gray-500 hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">Sign In</span>
              <span className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={onToggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              aria-expanded={isMobileMenuOpen}
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
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
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
              className="block text-black hover:scale-110 transition-transform duration-300"
              onClick={onToggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/AboutUs"
              className="block text-black hover:scale-110 transition-transform duration-300"
              onClick={onToggleMobileMenu}
            >
              About Us
            </Link>
            <Link
              to="/ContactUs"
              className="block text-black hover:scale-110 transition-transform duration-300"
              onClick={onToggleMobileMenu}
            >
              Contact
            </Link>
            <Link
              to="/StreetView"
              className="block text-black hover:scale-110 transition-transform duration-300"
              onClick={onToggleMobileMenu}
            >
              Street View
            </Link>
            {/* Added Traffic Info Link for Mobile */}
            <Link
              to="/TrafficInfo"
              className="block text-black hover:scale-110 transition-transform duration-300"
              onClick={onToggleMobileMenu}
            >
              Traffic Info
            </Link>
            <Link
              to="/AIAssistant"
              className="block text-black font-bold hover:text-gray-700 transition duration-300 relative font-futura tracking-wide hover:shadow-[0_0_8px_rgba(0,0,0,0.3)] hover:border hover:border-purple-600 hover:rounded-lg hover:px-2 hover:py-1"
              onClick={onToggleMobileMenu}
            >
              <span className="flex items-center">
                AI Assistant
                <svg 
                  className="w-5 h-5 ml-2 animate-pulse text-purple-600"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </span>
            </Link>
            <Link
              to="/user-profile"
              className="block text-center px-4 py-2 rounded-md text-white font-bold bg-gray-500 hover:bg-gray-600 transition-all duration-300"
              onClick={onToggleMobileMenu}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;