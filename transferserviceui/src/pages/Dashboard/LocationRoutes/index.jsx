import { useState, useEffect } from "react";

export default function Runways() {
  const [runwayName, setRunwayName] = useState("");
  const [fromLocationId, setFromLocationId] = useState("");
  const [toLocationId, setToLocationId] = useState("");
  const [prices, setPrices] = useState(Array(14).fill(""));
  const [runways, setRunways] = useState([]);
  const [locations, setLocations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [detailsId, setDetailsId] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = "https://localhost:7299/api/Runways";
  const LOCATIONS_API_URL = "https://localhost:7299/api/Locations";

  useEffect(() => {
    fetchLocations();
    fetchRunways();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch(LOCATIONS_API_URL);
      if (!response.ok) throw new Error("Failed to fetch locations");
      const data = await response.json();
      setLocations(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchRunways = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch runways");
      const data = await response.json();
      setRunways(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!runwayName.trim() || !fromLocationId || !toLocationId || prices.every((price) => !price.trim())) return;

    // Base runway data without the id
    const runwayData = {
      runwayName,
      fromLocationId: parseInt(fromLocationId),
      toLocationId: parseInt(toLocationId),
      pax1Price: parseFloat(prices[0]) || 0,
      pax2Price: parseFloat(prices[1]) || 0,
      pax3Price: parseFloat(prices[2]) || 0,
      pax4Price: parseFloat(prices[3]) || 0,
      pax5Price: parseFloat(prices[4]) || 0,
      pax6Price: parseFloat(prices[5]) || 0,
      pax7Price: parseFloat(prices[6]) || 0,
      pax8Price: parseFloat(prices[7]) || 0,
      pax9Price: parseFloat(prices[8]) || 0,
      pax10Price: parseFloat(prices[9]) || 0,
      pax11Price: parseFloat(prices[10]) || 0,
      pax12Price: parseFloat(prices[11]) || 0,
      pax13Price: parseFloat(prices[12]) || 0,
      pax14Price: parseFloat(prices[13]) || 0,
    };

    // Add id only if editing
    if (editId) {
      runwayData.id = editId;
    }

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_URL}/${editId}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(runwayData),
      });

      if (!response.ok) throw new Error(`Failed to ${editId ? "update" : "add"} runway`);

      await fetchRunways();
      setEditId(null);
      resetForm();
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setRunwayName("");
    setFromLocationId("");
    setToLocationId("");
    setPrices(Array(14).fill(""));
  };

  const handlePriceChange = (index, value) => {
    const newPrices = [...prices];
    newPrices[index] = value;
    setPrices(newPrices);
  };

  const handleEdit = (runway) => {
    setEditId(runway.id);
    setRunwayName(runway.runwayName);
    setFromLocationId(runway.fromLocationId.toString());
    setToLocationId(runway.toLocationId.toString());
    setPrices([
      runway.pax1Price.toString(),
      runway.pax2Price.toString(),
      runway.pax3Price.toString(),
      runway.pax4Price.toString(),
      runway.pax5Price.toString(),
      runway.pax6Price.toString(),
      runway.pax7Price.toString(),
      runway.pax8Price.toString(),
      runway.pax9Price.toString(),
      runway.pax10Price.toString(),
      runway.pax11Price.toString(),
      runway.pax12Price.toString(),
      runway.pax13Price.toString(),
      runway.pax14Price.toString(),
    ]);
  };

  const handleDeleteRequest = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${deleteId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete runway");

      await fetchRunways();
      if (editId === deleteId) {
        setEditId(null);
        resetForm();
      }
      setDeleteId(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const showDetails = (id) => {
    setDetailsId(id);
  };

  const closeDetails = () => {
    setDetailsId(null);
  };

  const getLocationName = (locationId) => {
    const location = locations.find((loc) => loc.id === locationId);
    return location ? location.name : "Unknown";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Runways</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {editId ? "Update Runway" : "Add New Runway"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={runwayName}
                onChange={(e) => setRunwayName(e.target.value)}
                placeholder="Runway Name"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <select
                value={fromLocationId}
                onChange={(e) => setFromLocationId(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option value="" disabled>
                  From Location
                </option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              <select
                value={toLocationId}
                onChange={(e) => setToLocationId(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option value="" disabled>
                  To Location
                </option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
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

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {runways.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">No runways available.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Runway Name
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
                {runways.map((runway) => (
                  <tr key={runway.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {runway.runwayName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getLocationName(runway.fromLocationId)} - {getLocationName(runway.toLocationId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(runway)}
                        className="text-indigo-600 hover:text-indigo-800 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRequest(runway.id)}
                        className="text-red-600 hover:text-red-800 mr-4"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => showDetails(runway.id)}
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

        {deleteId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the runway "
                {runways.find((r) => r.id === deleteId)?.runwayName}"? This action
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

        {detailsId && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                Runway Details
              </h3>
              {(() => {
                const runway = runways.find((r) => r.id === detailsId);
                const runwayPrices = [
                  runway.pax1Price,
                  runway.pax2Price,
                  runway.pax3Price,
                  runway.pax4Price,
                  runway.pax5Price,
                  runway.pax6Price,
                  runway.pax7Price,
                  runway.pax8Price,
                  runway.pax9Price,
                  runway.pax10Price,
                  runway.pax11Price,
                  runway.pax12Price,
                  runway.pax13Price,
                  runway.pax14Price,
                ];
                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center">
                        <span className="w-1/3 font-semibold text-gray-700">Runway Name:</span>
                        <span className="w-2/3 text-gray-900">{runway.runwayName}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-1/3 font-semibold text-gray-700">From Location:</span>
                        <span className="w-2/3 text-gray-900">{getLocationName(runway.fromLocationId)}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-1/3 font-semibold text-gray-700">To Location:</span>
                        <span className="w-2/3 text-gray-900">{getLocationName(runway.toLocationId)}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Pricing Details</h4>
                      <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto p-2 bg-gray-50 rounded-lg">
                        {runwayPrices.map((price, index) => (
                          price > 0 && (
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