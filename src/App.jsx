import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ApplyLeave from './pages/ApplyLeave.jsx';
import MyLeave from './pages/MyLeave.jsx';
import AdminRequests from './pages/AdminRequests.jsx';
import Employees from './pages/Employees.jsx';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [myLeaves, setMyLeaves] = useState([]);

  // Add a new leave
  function addLeave(leave) {
    setMyLeaves((prev) => [...prev, leave]);
  }

  // Update leave status for Admin
  function updateLeaveStatus(id, status) {
    setMyLeaves((prev) =>
      prev.map((leave) => (leave.id === id ? { ...leave, status } : leave))
    );
  }

  return (
    <div className='flex bg-white min-h-screen text-black'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <Navbar />
        <main className='flex-1 p-4'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route
              path='/admin-requests'
              element={
                <AdminRequests
                  myLeaves={myLeaves}
                  updateLeaveStatus={updateLeaveStatus}
                />
              }
            />
            <Route
              path='/apply-leave'
              element={<ApplyLeave addLeave={addLeave} />}
            />

            <Route path='/my-leave' element={<MyLeave myLeaves={myLeaves} />} />

            <Route
              path='/apply-leave'
              element={<ApplyLeave addLeave={addLeave} />}
            />

            <Route path='/employees' element={<Employees />} />
          </Routes>
        </main>
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />
      </div>
    </div>
  );
}

export default App;
