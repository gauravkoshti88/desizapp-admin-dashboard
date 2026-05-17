import React, { useContext } from 'react'
import AdminLogin from './pages/Login'
import { adminDataContext } from './context/AdminContext'
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Shops from './pages/Shops';
import DeliveryBoys from './pages/DeliveryBoys';
import VerificationRequests from './pages/VerificationRequests';
import BlockAccounts from './pages/BlockAccounts';
import AssignDelivery from './pages/AssignDelivery';
import Sidebar from './components/Sidebar';

function App() {
  let { adminData } = useContext(adminDataContext);

  return (
    <>
      {
        adminData && <Sidebar />
      }
      <div className={`${adminData && "ml-65"}`}>
        <Routes>
          <Route path='/' element={adminData ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path='/login' element={adminData ? <Navigate to="/" /> : <AdminLogin />} />
          <Route path="/customers" element={adminData ? <Customers /> : <Navigate to="/login" />} />
          <Route path="/shops" element={adminData ? <Shops /> : <Navigate to="/login" />} />
          <Route path="/deliveryBoys" element={adminData ? <DeliveryBoys /> : <Navigate to="/login" />} />
          <Route path="/assignDelivery" element={adminData ? <AssignDelivery /> : <Navigate to="/login" />} />
          <Route path="/verification" element={adminData ? <VerificationRequests /> : <Navigate to="/login" />} />
          <Route path="/blockAccounts" element={adminData ? <BlockAccounts /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  )
}

export default App
