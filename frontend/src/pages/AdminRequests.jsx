import { toast } from 'react-toastify';

export default function AdminRequests({ myLeaves, updateLeaveStatus }) {
  const handleAction = (id, status) => {
    updateLeaveStatus(id, status);

    // Show toast feedback
    toast.success(`Leave request ${status.toLowerCase()}!`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-300 text-gray-900';
      case 'Approved':
        return 'bg-green-500 text-white';
      case 'Rejected':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-gray-900';
    }
  };

  return (
    <div className='bg-white min-h-screen p-6 text-gray-900'>
      <h1 className='text-2xl font-bold mb-6 text-purple-600'>
        Admin Leave Requests
      </h1>

      <div className='overflow-x-auto'>
        <table className='w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='p-3 border-b border-gray-300'>Employee</th>
              <th className='p-3 border-b border-gray-300'>Leave Type</th>
              <th className='p-3 border-b border-gray-300'>Start Date</th>
              <th className='p-3 border-b border-gray-300'>End Date</th>
              <th className='p-3 border-b border-gray-300'>Status</th>
              <th className='p-3 border-b border-gray-300'>Action</th>
            </tr>
          </thead>
          <tbody>
            {myLeaves.map((leave) => (
              <tr key={leave.id} className='hover:bg-gray-100 transition'>
                <td className='p-3 border-b border-gray-300'>
                  {leave.employee || 'N/A'}
                </td>
                <td className='p-3 border-b border-gray-300'>
                  {leave.leaveType}
                </td>
                <td className='p-3 border-b border-gray-300'>
                  {leave.startDate}
                </td>
                <td className='p-3 border-b border-gray-300'>
                  {leave.endDate}
                </td>
                <td className='p-3 border-b border-gray-300'>
                  <span
                    className={`px-3 py-1 rounded-full ${getStatusColor(
                      leave.status
                    )}`}
                  >
                    {leave.status}
                  </span>
                </td>
                <td className='p-3 border-b border-gray-300 space-x-2'>
                  {leave.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleAction(leave.id, 'Approved')}
                        className='px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition'
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(leave.id, 'Rejected')}
                        className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition'
                      >
                        Reject
                      </button>
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
