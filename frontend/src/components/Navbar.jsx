export default function Navbar({ role, setRole }) {
  return (
    <header className='w-full p-4 border-b flex justify-between items-center'>
      <h1 className='text-xl font-bold text-purple-600'>
        Leave Management System
      </h1>

      <div className='flex items-center gap-4'>
        <span className='text-gray-600 capitalize'>{role}</span>
        <button
          onClick={() => {
            setRole(null); // clear React state
            localStorage.removeItem('role'); // clear from localStorage
          }}
          className='text-red-500 font-semibold'
        >
          Logout
        </button>
      </div>
    </header>
  );
}
