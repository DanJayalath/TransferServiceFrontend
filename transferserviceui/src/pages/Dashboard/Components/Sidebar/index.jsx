import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 bg-gray-100 text-gray-800 h-screen w-64 p-4 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 md:flex-shrink-0 border-r border-gray-200`}
      >
        <div className="flex items-center mb-6">
          <svg
            className="h-6 w-6 text-black mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          <h2 className="text-lg font-semibold text-black">Control Panel</h2>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded text-sm font-bold transition-colors duration-200 text-black ${
                    isActive
                      ? "bg-white border-l-4 border-black"
                      : "hover:bg-gray-50"
                  }`
                }
                onClick={() => onClose()}
              >
                <span className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center mr-3 text-gray-800">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </span>
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="./Bookings"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded text-sm font-bold transition-colors duration-200 text-black ${
                    isActive
                      ? "bg-white border-l-4 border-black"
                      : "hover:bg-gray-50"
                  }`
                }
                onClick={() => onClose()}
              >
                <span className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center mr-3 text-gray-800">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </span>
                <span>Bookings</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="./Messeges" // Fixed typo from "Messeges" to "Messages"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded text-sm font-bold transition-colors duration-200 text-black ${
                    isActive
                      ? "bg-white border-l-4 border-black"
                      : "hover:bg-gray-50"
                  }`
                }
                onClick={() => onClose()}
              >
                <span className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center mr-3 text-gray-800">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </span>
                <span>Messeges</span>
              </NavLink>
            </li>
            {/* Collapsible Settings Menu */}
            <li>
              <div>
                <button
                  onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
                  className={`flex items-center p-2 rounded text-sm font-bold transition-colors duration-200 text-black ${
                    isSettingsExpanded
                      ? "bg-white border-l-4 border-black"
                      : "hover:bg-gray-50"
                  } w-full focus:outline-none focus:ring-1 focus:ring-gray-400`}
                  aria-expanded={isSettingsExpanded}
                  aria-controls="settings-submenu"
                >
                  <span className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center mr-3 text-gray-800">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"
                      />
                    </svg>
                  </span>
                  <span>Settings</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-3 w-3 ml-auto transition-transform ${
                      isSettingsExpanded ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isSettingsExpanded && (
                  <ul id="settings-submenu" className="pl-6 mt-1 space-y-1">
                    <li>
                      <NavLink
                        to="./LocationCategories"
                        className={({ isActive }) =>
                          `flex items-center p-1 rounded text-xs transition-colors duration-200 text-gray-600 ${
                            isActive
                              ? "bg-white border-l-2 border-black text-black"
                              : "hover:bg-gray-50"
                          }`
                        }
                        onClick={() => onClose()}
                      >
                        <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                        <span>Location Categories</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="./Locations"
                        className={({ isActive }) =>
                          `flex items-center p-1 rounded text-xs transition-colors duration-200 text-gray-600 ${
                            isActive
                              ? "bg-white border-l-2 border-black text-black"
                              : "hover:bg-gray-50"
                          }`
                        }
                        onClick={() => onClose()}
                      >
                        <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                        <span>Locations</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="./Drivers"
                        className={({ isActive }) =>
                          `flex items-center p-1 rounded text-xs transition-colors duration-200 text-gray-600 ${
                            isActive
                              ? "bg-white border-l-2 border-black text-black"
                              : "hover:bg-gray-50"
                          }`
                        }
                        onClick={() => onClose()}
                      >
                        <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                        <span>Drivers</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="./Vehicles"
                        className={({ isActive }) =>
                          `flex items-center p-1 rounded text-xs transition-colors duration-200 text-gray-600 ${
                            isActive
                              ? "bg-white border-l-2 border-black text-black"
                              : "hover:bg-gray-50"
                          }`
                        }
                        onClick={() => onClose()}
                      >
                        <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                        <span>Vehicles</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="./LocationRoutes"
                        className={({ isActive }) =>
                          `flex items-center p-1 rounded text-xs transition-colors duration-200 text-gray-600 ${
                            isActive
                              ? "bg-white border-l-2 border-black text-black"
                              : "hover:bg-gray-50"
                          }`
                        }
                        onClick={() => onClose()}
                      >
                        <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                        <span>Tour Routes</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
}