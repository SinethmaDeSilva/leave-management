import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  const [myLeaves, setMyLeaves] = useState([]);
  const [role, setRole] = useState(() => localStorage.getItem('role') || null);

  // Sync role changes to localStorage
  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('role');
    }
  }, [role]);

  function addLeave(leave) {
    setMyLeaves((prev) => [...prev, leave]);
  }

  function updateLeaveStatus(id, status) {
    setMyLeaves((prev) =>
      prev.map((leave) => (leave.id === id ? { ...leave, status } : leave))
    );
  }

  // 🔐 LOGIN GATE
  if (!role) {
    return <Login setRole={setRole} />;
  }

  return (
    <div className='flex bg-white min-h-screen text-black'>
      <Sidebar role={role} />

      <div className='flex-1 flex flex-col'>
        <Navbar
          role={role}
          setRole={() => setRole(null)} // Logout button works now
        />

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
          </Routes>

          <ToastContainer position='top-right' autoClose={3000} />
        </main>
      </div>
    </div>
  );
}

export default App;
