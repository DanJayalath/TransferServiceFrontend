// src/components/Header/index.jsx
import { useState } from "react";

export default function Header({ isSidebarOpen, onToggleSidebar }) {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center w-full">
      {/* Hamburger Menu Button */}
      <button
        onClick={onToggleSidebar}
        className="p-2 bg-gray-200 rounded md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Title and User Info */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <span className="font-semibold">John Doe</span>
      </div>

      {/* Notifications Icon */}
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-gray-200 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 110-6 3 3 0 010 6z" />
          </svg>
        </button>
      </div>
    </header>
  );
}