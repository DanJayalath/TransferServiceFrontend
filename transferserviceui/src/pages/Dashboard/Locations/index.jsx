import { useState } from "react";

export default function Locations() {
  // Dummy categories for the dropdown (in a real app, fetch from backend or share state)
  const [categories] = useState([
    { id: 1, name: "Paris City" },
    { id: 2, name: "DisneyLand" },
    { id: 3, name: "Airports" },
  ]);

  // State for form inputs, locations list, and delete confirmation
  const [locationName, setLocationName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [locations, setLocations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Handle form submission to add or update a location
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!locationName.trim() || !selectedCategory) return;

    const categoryId = Number(selectedCategory); // Convert to number

    if (editId) {
      // Update existing location
      setLocations(
        locations.map((loc) =>
          loc.id === editId
            ? { ...loc, name: locationName, categoryId }
            : loc
        )
      );
      setEditId(null);
    } else {
      // Add new location
      const newLocation = {
        id: Date.now(), // Simple ID generation
        name: locationName,
        categoryId, // Store as number
      };
      setLocations([...locations, newLocation]);
    }
    setLocationName("");
    setSelectedCategory("");
  };

  // Handle edit button click
  const handleEdit = (location) => {
    setEditId(location.id);
    setLocationName(location.name);
    setSelectedCategory(String(location.categoryId)); // Convert back to string for select
  };

  // Show delete confirmation
  const handleDeleteRequest = (id) => {
    setDeleteId(id);
  };

  // Confirm delete
  const confirmDelete = () => {
    setLocations(locations.filter((loc) => loc.id !== deleteId));
    if (editId === deleteId) {
      setEditId(null);
      setLocationName("");
      setSelectedCategory("");
    }
    setDeleteId(null);
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Locations</h1>

        {/* Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {editId ? "Update Location" : "Add New Location"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Enter location name"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
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
                  setLocationName("");
                  setSelectedCategory("");
                }}
                className="px-6 py-3 rounded-md bg-gray-500 hover:bg-gray-600 text-white font-medium transition-colors"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {locations.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">
              No locations available.
            </p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location Name
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
                {locations.map((location) => (
                  <tr key={location.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {location.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {
                        categories.find((cat) => cat.id === location.categoryId)
                          ?.name || "N/A"
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(location)}
                        className="text-indigo-600 hover:text-indigo-800 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRequest(location.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
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
                Are you sure you want to delete the location "
                {locations.find((loc) => loc.id === deleteId)?.name}"? This
                action cannot be undone.
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
      </div>
    </div>
  );
}