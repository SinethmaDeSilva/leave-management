import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      toast.error('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/signup',
        {
          username,
          password,
          role,
        }
      );

      if (response.data.success) {
        // Store user info
        localStorage.setItem('role', response.data.user.role);
        localStorage.setItem('username', response.data.user.username);

        toast.success('Account created successfully!');

        // Redirect to home
        window.location.href = '/';
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-purple-600 mb-2'>
            Leave Management System
          </h1>
          <p className='text-gray-600'>Create your account</p>
        </div>

        <form onSubmit={handleSignup} className='space-y-4'>
          <div>
            <label className='block text-gray-700 font-medium mb-2'>
              Username
            </label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              placeholder='Choose a username'
            />
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-2'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              placeholder='Create a password'
            />
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-2'>
              Confirm Password
            </label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              placeholder='Confirm your password'
            />
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-2'>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white'
            >
              <option value='employee'>Employee</option>
              <option value='admin'>Admin</option>
            </select>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-gray-600'>
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className='text-purple-600 font-semibold hover:underline'
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
