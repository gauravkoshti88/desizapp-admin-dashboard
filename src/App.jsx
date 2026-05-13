import React, { useContext } from 'react'
import AdminLogin from './pages/Login'
import { adminDataContext } from './context/AdminContext'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  let {adminData} = useContext(adminDataContext);

  return (
    <>
        <Routes>
          <Route path='/' element={adminData ? <Home/> : <Navigate to="/login"/>}/>
          <Route path='/login' element={adminData ? <Navigate to="/"/> : <AdminLogin/>}/>
        </Routes>
    </>
  )
}

export default App
