// src/components/Table/index.jsx
export default function Table() {
  const rows = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
  ];

  return (
    <table className="w-full bg-white rounded-lg shadow-md">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-4 text-left">Name</th>
          <th className="p-4 text-left">Email</th>
          <th className="p-4 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border-b">
            <td className="p-4">{row.name}</td>
            <td className="p-4">{row.email}</td>
            <td className="p-4">{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}