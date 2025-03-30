import { useState, useEffect } from "react";

export default function LocationCategories() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://localhost:7299/api/LocationCategories";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.title || "Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      setError("Category name cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const categoryData = { name: categoryName, id: editId || 0 };

      const response = await fetch(editId ? `${API_URL}/${editId}` : API_URL, {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.title || `Failed to ${editId ? "update" : "create"} category`);
      }

      await fetchCategories();
      setCategoryName("");
      setEditId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditId(category.id);
    setCategoryName(category.name);
    setError(null);
  };

  const handleDeleteRequest = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.title || "Failed to delete category");
      }

      await fetchCategories();
      if (editId === deleteId) {
        setEditId(null);
        setCategoryName("");
      }
      setDeleteId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const resetForm = () => {
    setEditId(null);
    setCategoryName("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Location Categories</h1>

        {error && (
          <p className="text-red-500 mb-4 bg-red-100 p-3 rounded">{error}</p>
        )}

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {editId ? "Update Category" : "Add New Category"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 disabled:opacity-50"
              disabled={loading}
            />
            <button
              type="submit"
              className={`px-6 py-3 rounded-md text-white font-medium ${
                editId
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Processing..." : editId ? "Update" : "Add"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-md bg-gray-500 hover:bg-gray-600 text-white font-medium transition-colors disabled:opacity-50"
                disabled={loading}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {loading && !categories.length ? (
            <p className="p-6 text-gray-500 text-center">Loading...</p>
          ) : categories.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">No categories available.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-indigo-600 hover:text-indigo-800 mr-4 disabled:opacity-50"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRequest(category.id)}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                        disabled={loading}
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

        {deleteId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the category "
                {categories.find((cat) => cat.id === deleteId)?.name}"? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  No
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Yes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}