import { useState } from "react";

export default function AdminRequests() {
  // Sample data
  const [requests, setRequests] = useState([
    { id: 1, employee: "John Doe", type: "Casual", start: "2025-12-10", end: "2025-12-12", status: "Pending" },
    { id: 2, employee: "Jane Smith", type: "Sick", start: "2025-11-15", end: "2025-11-16", status: "Pending" },
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return "bg-yellow-300 text-gray-900";
      case "Approved": return "bg-green-500 text-white";
      case "Rejected": return "bg-red-500 text-white";
      default: return "bg-gray-300 text-gray-900";
    }
  }

  const handleAction = (id, action) => {
  setRequests(requests.map(req => req.id === id ? { ...req, status: action } : req));
  alert(`Request ${action}`); // simple feedback for now
};


  return (
    <div className="text-gray-900 bg-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">Admin Leave Requests</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-300 bg-gray-50 rounded-md shadow-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border-b border-gray-300">Employee</th>
              <th className="p-3 border-b border-gray-300">Leave Type</th>
              <th className="p-3 border-b border-gray-300">Start Date</th>
              <th className="p-3 border-b border-gray-300">End Date</th>
              <th className="p-3 border-b border-gray-300">Status</th>
              <th className="p-3 border-b border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
  <tr key={req.id} className="hover:bg-gray-100 transition">
    <td>{req.employee}</td>
    <td>{req.type}</td>
    <td>{req.start}</td>
    <td>{req.end}</td>
    <td>
      <span className={`px-3 py-1 rounded-full ${getStatusColor(req.status)}`}>
        {req.status}
      </span>
    </td>
    <td>
      {req.status === "Pending" && (
        <>
          <button onClick={() => handleAction(req.id, "Approved")} className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">Approve</button>
          <button onClick={() => handleAction(req.id, "Rejected")} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 ml-2">Reject</button>
        </>
      )}
    </td>
  </tr>
))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
