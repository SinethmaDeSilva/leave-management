import { Link } from 'react-router-dom';

export default function Sidebar({ role }) {
  return (
    <div className='w-64 min-h-screen bg-gray-100 p-6 border-r'>
      <h2 className='text-xl font-bold text-purple-600 mb-6'>Leave System</h2>

      <nav className='flex flex-col space-y-4'>
        <Link to='/'>Dashboard</Link>

        {role === 'employee' && (
          <>
            <Link to='/apply-leave'>Apply Leave</Link>
            <Link to='/my-leave'>My Leaves</Link>
          </>
        )}

        {role === 'admin' && (
          <>
            <Link to='/admin-requests'>Leave Requests</Link>
            <Link to='/employees'>Employees</Link>
          </>
        )}
      </nav>
    </div>
  );
}
