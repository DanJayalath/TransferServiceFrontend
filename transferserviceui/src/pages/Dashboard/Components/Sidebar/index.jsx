import { useState } from "react";

export default function Sidebar({ isOpen, onClose }) {
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 bg-gray-800 text-white h-screen w-64 p-4 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 md:flex-shrink-0`}
        aria-hidden={!isOpen}
      >
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
                aria-current="page"
              >
                <span>Home</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <span>Analytics</span>
              </a>
            </li>
            {/* Collapsible Settings Menu */}
            <li>
              <div>
                {/* Toggle Button for Settings */}
                <button
                  onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
                  className="flex items-center justify-between w-full p-2 hover:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-expanded={isSettingsExpanded}
                  aria-controls="settings-submenu"
                >
                  <span>Settings</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${
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
                {/* Submenu Items */}
                {isSettingsExpanded && (
                  <ul id="settings-submenu" className="pl-4 mt-2 space-y-1">
                    <li>
                      <a
                        href="#"
                        className="block p-2 hover:bg-gray-600 rounded"
                      >
                        Locations
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block p-2 hover:bg-gray-600 rounded"
                      >
                        Drivers
                      </a>
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
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
}