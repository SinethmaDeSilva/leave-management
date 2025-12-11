import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import ApplyLeave from './pages/ApplyLeave.jsx';
import MyLeave from './pages/MyLeave.jsx';
import AdminRequests from './pages/AdminRequests.jsx';
import Employees from './pages/Employees.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  // State to store leaves for the logged-in user
  const [myLeaves, setMyLeaves] = useState([]);

  return (
    <div className="flex bg-white min-h-screen text-black">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            
            {/* Pass myLeaves state and setter as props */}
            <Route 
              path="/apply-leave" 
              element={<ApplyLeave myLeaves={myLeaves} setMyLeaves={setMyLeaves} />} 
            />
            <Route 
              path="/my-leave" 
              element={<MyLeave myLeaves={myLeaves} />} 
            />
            
            <Route path="/admin-requests" element={<AdminRequests />} />
            <Route path="/employees" element={<Employees />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
