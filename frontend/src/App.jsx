import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ApplyLeave from './pages/ApplyLeave.jsx';
import MyLeave from './pages/MyLeave.jsx';
import AdminRequests from './pages/AdminRequests.jsx';
import Employees from './pages/Employees.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

function App() {
  const [myLeaves, setMyLeaves] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  // Check authentication on mount
  useEffect(() => {
    const userRole = localStorage.getItem('role');

    if (userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  function addLeave(leave) {
    setMyLeaves((prev) => [...prev, leave]);
  }

  function updateLeaveStatus(id, status) {
    setMyLeaves((prev) =>
      prev.map((leave) => (leave.id === id ? { ...leave, status } : leave))
    );
  }

  function handleLogout() {
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setRole(null);
  }

  // Public routes (login/signup)
  if (!isAuthenticated) {
    return (
      <>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
        <ToastContainer position='top-right' autoClose={3000} />
      </>
    );
  }

  // Protected routes (authenticated users)
  return (
    <div className='flex bg-white min-h-screen text-black'>
      <Sidebar role={role} />

      <div className='flex-1 flex flex-col'>
        <Navbar role={role} onLogout={handleLogout} />

        <main className='flex-1 p-4'>
          <Routes>
            <Route path='/' element={<Dashboard />} />

            {role === 'employee' && (
              <>
                <Route
                  path='/apply-leave'
                  element={<ApplyLeave addLeave={addLeave} />}
                />
                <Route
                  path='/my-leave'
                  element={<MyLeave myLeaves={myLeaves} />}
                />
              </>
            )}

            {role === 'admin' && (
              <>
                <Route
                  path='/admin-requests'
                  element={
                    <AdminRequests
                      myLeaves={myLeaves}
                      updateLeaveStatus={updateLeaveStatus}
                    />
                  }
                />
                <Route path='/employees' element={<Employees />} />
              </>
            )}

            {/* Redirect to home for any unknown routes */}
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>

          <ToastContainer position='top-right' autoClose={3000} />
        </main>
      </div>
    </div>
  );
}

export default App;
