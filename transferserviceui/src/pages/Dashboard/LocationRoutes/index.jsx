import { useState } from "react";

export default function Routes() {
  // State for form inputs, routes list, and modals
  const [routeName, setRouteName] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [prices, setPrices] = useState(Array(14).fill(""));
  const [routes, setRoutes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [detailsId, setDetailsId] = useState(null);

  // Example Paris locations
  const parisLocations = [
    "Eiffel Tower",
    "Louvre Museum",
    "Notre-Dame Cathedral",
    "Arc de Triomphe",
    "Montmartre",
    "Sacré-Cœur Basilica",
    "Champs-Élysées",
    "Palace of Versailles",
  ];

  // Handle form submission to add or update a route
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!routeName.trim() || !fromLocation || !toLocation || prices.every((price) => !price.trim())) return;

    const routeData = {
      id: editId || Date.now(),
      routeName,
      fromLocation,
      toLocation,
      prices: [...prices],
    };

    if (editId) {
      setRoutes(
        routes.map((route) =>
          route.id === editId ? routeData : route
        )
      );
      setEditId(null);
    } else {
      setRoutes([...routes, routeData]);
    }
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setRouteName("");
    setFromLocation("");
    setToLocation("");
    setPrices(Array(14).fill(""));
  };

  // Handle price input change
  const handlePriceChange = (index, value) => {
    const newPrices = [...prices];
    newPrices[index] = value;
    setPrices(newPrices);
  };

  // Handle edit button click
  const handleEdit = (route) => {
    setEditId(route.id);
    setRouteName(route.routeName);
    setFromLocation(route.fromLocation);
    setToLocation(route.toLocation);
    setPrices([...route.prices]);
  };

  // Handle delete request
  const handleDeleteRequest = (id) => {
    setDeleteId(id);
  };

  // Confirm delete
  const confirmDelete = () => {
    setRoutes(routes.filter((route) => route.id !== deleteId));
    if (editId === deleteId) {
      setEditId(null);
      resetForm();
    }
    setDeleteId(null);
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteId(null);
  };

  // Show route details
  const showDetails = (id) => {
    setDetailsId(id);
  };

  // Close details modal
  const closeDetails = () => {
    setDetailsId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Routes</h1>

        {/* Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {editId ? "Update Route" : "Add New Route"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                placeholder="Route Name"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <select
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option value="" disabled>
                  From Location
                </option>
                {parisLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <select
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option value="" disabled>
                  To Location
                </option>
                {parisLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {prices.map((price, index) => (
                <input
                  key={index}
                  type="number"
                  value={price}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                  placeholder={`${index + 1} Pax Price`}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  min="0"
                  step="0.01"
                />
              ))}
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className={`px-6 py-3 rounded-md text-white font-medium ${
                  editId
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-colors`}
              >
                {editId ? "Update" : "Add"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    resetForm();
                  }}
                  className="px-6 py-3 rounded-md bg-gray-500 hover:bg-gray-600 text-white font-medium transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {routes.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">No routes available.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From - To
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {routes.map((route) => (
                  <tr key={route.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {route.routeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {route.fromLocation} - {route.toLocation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(route)}
                        className="text-indigo-600 hover:text-indigo-800 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRequest(route.id)}
                        className="text-red-600 hover:text-red-800 mr-4"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => showDetails(route.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the route "
                {routes.find((r) => r.id === deleteId)?.routeName}"? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  No
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Route Details Modal */}
        {detailsId && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                Route Details
              </h3>
              {(() => {
                const route = routes.find((r) => r.id === detailsId);
                return (
                  <div className="space-y-6">
                    {/* Route Information */}
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center">
                        <span className="w-1/3 font-semibold text-gray-700">Route Name:</span>
                        <span className="w-2/3 text-gray-900">{route.routeName}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-1/3 font-semibold text-gray-700">From Location:</span>
                        <span className="w-2/3 text-gray-900">{route.fromLocation}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-1/3 font-semibold text-gray-700">To Location:</span>
                        <span className="w-2/3 text-gray-900">{route.toLocation}</span>
                      </div>
                    </div>

                    {/* Prices Section */}
                    <div className="border-t pt-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Pricing Details</h4>
                      <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto p-2 bg-gray-50 rounded-lg">
                        {route.prices.map((price, index) => (
                          price && (
                            <div
                              key={index}
                              className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
                            >
                              <span className="text-gray-700 font-medium">
                                {index + 1} Pax:
                              </span>
                              <span className="text-green-600 font-semibold">
                                ${parseFloat(price).toFixed(2)}
                              </span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
              <div className="flex justify-end mt-8">
                <button
                  onClick={closeDetails}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}