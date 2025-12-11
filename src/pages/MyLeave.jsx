export default function MyLeave({ myLeaves }) {
  // Function to determine badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-300 text-gray-900";
      case "Approved":
        return "bg-green-200 text-gray-900"; // secondary
      case "Rejected":
        return "bg-red-200 text-gray-900";
      default:
        return "bg-gray-200 text-gray-900";
    }
  };

  return (
    <div className="text-gray-900 bg-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6 text-purple-600">My Leaves</h1>

      {myLeaves.length === 0 ? (
        <p>No leave requests submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b border-gray-300">Leave Type</th>
                <th className="p-3 border-b border-gray-300">Start Date</th>
                <th className="p-3 border-b border-gray-300">End Date</th>
                <th className="p-3 border-b border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {myLeaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-200 transition">
                  <td className="p-3 border-b border-gray-300">{leave.leaveType}</td>
                  <td className="p-3 border-b border-gray-300">{leave.startDate}</td>
                  <td className="p-3 border-b border-gray-300">{leave.endDate}</td>
                  <td className="p-3 border-b border-gray-300">
                    <span
                      className={`px-3 py-1 rounded-full ${getStatusColor(
                        leave.status
                      )}`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
