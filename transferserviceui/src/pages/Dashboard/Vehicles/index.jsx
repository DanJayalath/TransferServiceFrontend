import { useState, useEffect } from "react";

export default function Vehicles() {
  const [vehicleNo, setVehicleNo] = useState("");
  const [vehicleCategory, setVehicleCategory] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [price, setPrice] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [detailsId, setDetailsId] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = "https://localhost:7299/api/Vehicles";
  const categories = ["Economical Car", "Luxury Car", "Mini Van", "Sport Car"];

  // Fetch all vehicles on component mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch vehicles");
      const data = await response.json();
      setVehicles(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vehicleNo.trim() || !vehicleCategory || !vehicleModel.trim() || !price.trim()) return;

    const vehicleData = {
      id: editId || 0, // 0 for new vehicles, API will generate actual ID
      vehicleNo,
      vehicleCategory,
      vehicleModel,
      price: parseFloat(price),
    };

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_URL}/${editId}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
      });

      if (!response.ok) throw new Error(`Failed to ${editId ? "update" : "add"} vehicle`);

      await fetchVehicles(); // Refresh the list
      setEditId(null);
      resetForm();
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setVehicleNo("");
    setVehicleCategory("");
    setVehicleModel("");
    setPrice("");
  };

  const handleEdit = (vehicle) => {
    setEditId(vehicle.id);
    setVehicleNo(vehicle.vehicleNo);
    setVehicleCategory(vehicle.vehicleCategory);
    setVehicleModel(vehicle.vehicleModel);
    setPrice(vehicle.price.toString());
  };

  const handleDeleteRequest = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${deleteId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete vehicle");

      await fetchVehicles();
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Vehicles</h1>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {editId ? "Update Vehicle" : "Add New Vehicle"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={vehicleNo}
                onChange={(e) => setVehicleNo(e.target.value)}
                placeholder="Vehicle No"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <select
                value={vehicleCategory}
                onChange={(e) => setVehicleCategory(e.target.value)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option value="" disabled>
                  Select Vehicle Category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                placeholder="Vehicle Model"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                min="0"
                step="0.01"
              />
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
          {vehicles.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">No vehicles available.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vehicle.vehicleNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vehicle.vehicleCategory}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(vehicle)}
                        className="text-indigo-600 hover:text-indigo-800 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRequest(vehicle.id)}
                        className="text-red-600 hover:text-red-800 mr-4"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => showDetails(vehicle.id)}
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
                Are you sure you want to delete the vehicle "
                {vehicles.find((v) => v.id === deleteId)?.vehicleNo}"? This action
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

        {/* Vehicle Details Modal */}
        {detailsId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Vehicle Details
              </h3>
              {(() => {
                const vehicle = vehicles.find((v) => v.id === detailsId);
                return (
                  <div className="space-y-4">
                    <p>
                      <strong className="text-gray-700">Vehicle No:</strong>{" "}
                      {vehicle.vehicleNo}
                    </p>
                    <p>
                      <strong className="text-gray-700">Category:</strong>{" "}
                      {vehicle.vehicleCategory}
                    </p>
                    <p>
                      <strong className="text-gray-700">Model:</strong>{" "}
                      {vehicle.vehicleModel}
                    </p>
                    <p>
                      <strong className="text-gray-700">Price:</strong> $
                      {parseFloat(vehicle.price).toFixed(2)}
                    </p>
                  </div>
                );
              })()}
              <div className="flex justify-end mt-6">
                <button
                  onClick={closeDetails}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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