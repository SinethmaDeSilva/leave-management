export default function Navbar({ role, onLogout }) {
  const username = localStorage.getItem('username') || 'User';

  return (
    <header className='w-full p-4 border-b flex justify-between items-center'>
      <h1 className='text-xl font-bold text-purple-600'>
        Leave Management System
      </h1>

      <div className='flex items-center gap-4'>
        <div className='text-right'>
          <p className='text-gray-800 font-medium'>{username}</p>
          <p className='text-sm text-gray-600 capitalize'>{role}</p>
        </div>
        <button
          onClick={onLogout}
          className='bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-200'
        >
          Logout
        </button>
      </div>
    </header>
  );
}
