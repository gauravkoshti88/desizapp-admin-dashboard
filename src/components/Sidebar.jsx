import React, { useContext } from "react";
import {
  MdDashboard,
  MdPeople,
  MdStore,
  MdLocalShipping,
  MdAssignmentInd,
  MdVerifiedUser,
  MdBlock,
} from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
import { IoLogOutOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  const { setAdminData, setDashboardData } = useContext(adminDataContext);
  const { serverUrl } = useContext(AuthContext);

  const menuItems = [
    { id: "", label: "Dashboard", icon: <MdDashboard /> },
    { id: "customers", label: "Customers", icon: <MdPeople /> },
    { id: "shops", label: "Shops", icon: <MdStore /> },
    { id: "deliveryBoys", label: "Delivery Boys", icon: <MdLocalShipping /> },
    { id: "assignDelivery", label: "Assign Delivery Boys", icon: <MdAssignmentInd /> },
    { id: "verification", label: "Verification Requests", icon: <MdVerifiedUser /> },
    { id: "blockAccounts", label: "Block Accounts", icon: <MdBlock /> },
  ];

  const handleLogout = async () => {
    try {
      const response = await axios.post(serverUrl + "/api/auth/user/logout", {}, { withCredentials: true });
      setAdminData(null)
      setDashboardData(null)
    } catch (error) {
      toast.error("Logout Error", {
        position: "top-right",
        style: { backgroundColor: "orange", color: "white", fontWeight: "bold" },
        autoClose: 4000,
      });
    }
  }

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-white shadow-xl fixed left-0 top-0">
      <div className="flex justify-center">
        <img
          src={Logo}
          alt="Admin Logo"
          className="w-45 h-25 rounded-full cursor-pointer hover:scale-105 transition"
          onClick={() => navigate("/")}
        />
      </div>
      <hr />
      <nav className="flex flex-col mt-4 space-y-2 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={`/${item.id}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 
              ${isActive
                ? "bg-slate-700 text-blue-400 border-l-4 border-blue-400 font-semibold"
                : "hover:bg-slate-700 hover:text-blue-300"}`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="w-55 flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition absolute bottom-5"
        >
          <IoLogOutOutline size={20} />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
