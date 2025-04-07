// src/Components/Footer.jsx
import React from 'react';
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full">


      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4 flex items-center">
              <span className="w-8 h-8 bg-yellow-500 rounded-full mr-2"></span> {/* Placeholder for logo */}
              Paris Easy Move
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              mean meridian strikes thousand foliage of my trees unknown plants are noticed when I hear the buzz of the little world among the stalks.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 text-sm mb-2">
              Address: Patricia C. Amedee 4401 Waldeck Street Grapevine Nashville, TX 76051
            </p>
            <p className="text-gray-400 text-sm mb-2">
              Phone: +99 (0) 101 0000 888
            </p>
            <p className="text-gray-400 text-sm">
              Email: info@yourdomain.com
            </p>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Subscribe Us!</h3>
            <p className="text-gray-400 text-sm mb-4">
              which bears and sustains us, as it floats around us in an eternity of bliss.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="your email"
                className="bg-gray-800 text-gray-300 text-sm rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <button
                type="submit"
                className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 sm:mb-0">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              Terms of Use
            </a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              France Government Registered
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            Copyright © 2025 Paris Easy Move, All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;