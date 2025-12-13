export default function Login({ setRole }) {
  const handleLogin = (selectedRole) => {
    localStorage.setItem('role', selectedRole); // ✅ Save role
    setRole(selectedRole); // ✅ Update React state
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-80 space-y-4'>
        <h2 className='text-xl font-bold text-center text-purple-600'>Login</h2>

        <button
          onClick={() => handleLogin('employee')}
          className='w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700'
        >
          Login as Employee
        </button>

        <button
          onClick={() => handleLogin('admin')}
          className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700'
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}
