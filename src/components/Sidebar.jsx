import {Link} from 'react-router-dom'

export default function Sidebar(){
    return (
    <div className="text-black bg-gray-200 p-4 h-screen w-64 space-y-6">
      <h2 className="text-xl font-bold">Admin Panel</h2>

      <nav className="flex flex-col space-y-4">
        <Link to="/" className="hover:text-primary-400">Dashboard</Link>
        <Link to="/admin-requests" className="hover:text-primary-400">Leave Requests</Link>
        <Link to="/employees" className="hover:text-primary-400">Employees</Link>
        <Link to="/apply-leave" className="hover:text-primary-400">Apply Leave</Link>
        <Link to="/my-leave" className="hover:text-primary-400">My Leave</Link>
      </nav>
    </div>
    )
}