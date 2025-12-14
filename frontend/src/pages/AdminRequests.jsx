import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminRequests() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Fetch all leave requests
  useEffect(() => {
    fetchLeaves();
  }, []);

  async function fetchLeaves() {
    try {
      const res = await axios.get('http://localhost:5000/api/leaves');
      setLeaves(res.data.leaves);
    } catch (error) {
      console.error('Failed to fetch leaves', error);
    } finally {
      setLoading(false);
    }
  }

  // 2️⃣ Approve / Reject
  async function handleAction(id, status) {
    try {
      await axios.put(`http://localhost:5000/api/leaves/${id}`, { status });
      fetchLeaves(); // refresh table
    } catch (error) {
      console.error('Failed to update leave', error);
    }
  }

  if (loading) {
    return <p className='p-6'>Loading leave requests...</p>;
  }

  return (
    <div className='bg-white min-h-screen p-6 text-gray-900'>
      <h1 className='text-2xl font-bold mb-6 text-purple-600'>
        Admin Leave Requests
      </h1>

      {leaves.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        <table className='w-full border bg-gray-50 rounded shadow'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='p-3'>Employee</th>
              <th className='p-3'>Type</th>
              <th className='p-3'>Start</th>
              <th className='p-3'>End</th>
              <th className='p-3'>Status</th>
              <th className='p-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id} className='text-center border-t'>
                <td className='p-3'>{leave.employee}</td>
                <td className='p-3'>{leave.leaveType}</td>
                <td className='p-3'>{leave.startDate}</td>
                <td className='p-3'>{leave.endDate}</td>
                <td className='p-3 font-semibold'>{leave.status}</td>
                <td className='p-3 space-x-2'>
                  {leave.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleAction(leave._id, 'Approved')}
                        className='bg-green-500 text-white px-3 py-1 rounded'
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(leave._id, 'Rejected')}
                        className='bg-red-500 text-white px-3 py-1 rounded'
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
      )}
    </div>
  );
}
