import { useState, useEffect } from "react";

export default function Drivers() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [telephone, setTelephone] = useState("");
    const [description, setDescription] = useState("");
    const [drivers, setDrivers] = useState([]);
    const [editId, setEditId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [detailsId, setDetailsId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = "https://localhost:7299/api/Drivers";

    // Fetch drivers on component mount
    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(API_URL);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.title || "Failed to fetch drivers");
            }
            const data = await response.json();
            setDrivers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !address.trim() || !telephone.trim()) {
            setError("Name, address, and telephone are required");
            return;
        }

        const driverData = {
            id: editId || 0, // 0 for new drivers, API will assign real ID
            name,
            address,
            telephone,
            description,
        };

        try {
            setLoading(true);
            setError(null);
            const url = editId ? `${API_URL}/${editId}` : API_URL;
            const method = editId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(driverData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.title || `Failed to ${editId ? "update" : "add"} driver`);
            }

            await fetchDrivers(); // Refresh the list
            resetForm();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setEditId(null);
        setName("");
        setAddress("");
        setTelephone("");
        setDescription("");
        setError(null);
    };

    const handleEdit = (driver) => {
        setEditId(driver.id);
        setName(driver.name);
        setAddress(driver.address);
        setTelephone(driver.telephone);
        setDescription(driver.description || "");
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
                throw new Error(errorData.title || "Failed to delete driver");
            }

            await fetchDrivers();
            if (editId === deleteId) resetForm();
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

    const showDetails = (id) => {
        setDetailsId(id);
    };

    const closeDetails = () => {
        setDetailsId(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Drivers</h1>

                {error && (
                    <p className="text-red-500 mb-4 bg-red-100 p-3 rounded">{error}</p>
                )}

                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        {editId ? "Update Driver" : "Add New Driver"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Driver Name"
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 disabled:opacity-50"
                                disabled={loading}
                            />
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Address"
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 disabled:opacity-50"
                                disabled={loading}
                            />
                            <input
                                type="tel"
                                value={telephone}
                                onChange={(e) => setTelephone(e.target.value)}
                                placeholder="Telephone Number"
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 disabled:opacity-50"
                                disabled={loading}
                            />
                        </div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 disabled:opacity-50"
                            rows="3"
                            disabled={loading}
                        />
                        <div className="flex gap-4">
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
                        </div>
                    </form>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {loading && !drivers.length ? (
                        <p className="p-6 text-gray-500 text-center">Loading...</p>
                    ) : drivers.length === 0 ? (
                        <p className="p-6 text-gray-500 text-center">No drivers available.</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Driver Name
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {drivers.map((driver) => (
                                    <tr key={driver.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {driver.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(driver)}
                                                className="text-indigo-600 hover:text-indigo-800 mr-4 disabled:opacity-50"
                                                disabled={loading}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteRequest(driver.id)}
                                                className="text-red-600 hover:text-red-800 mr-4 disabled:opacity-50"
                                                disabled={loading}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => showDetails(driver.id)}
                                                className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                                                disabled={loading}
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
                                Are you sure you want to delete the driver "
                                {drivers.find((d) => d.id === deleteId)?.name}"? This action cannot be undone.
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

                {detailsId && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Driver Details
                            </h3>
                            {(() => {
                                const driver = drivers.find((d) => d.id === detailsId);
                                return (
                                    <div className="space-y-4">
                                        <p>
                                            <strong className="text-gray-700">Name:</strong> {driver.name}
                                        </p>
                                        <p>
                                            <strong className="text-gray-700">Address:</strong> {driver.address}
                                        </p>
                                        <p>
                                            <strong className="text-gray-700">Telephone:</strong> {driver.telephone}
                                        </p>
                                        <p>
                                            <strong className="text-gray-700">Description:</strong> {driver.description || "N/A"}
                                        </p>
                                    </div>
                                );
                            })()}
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={closeDetails}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    disabled={loading}
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