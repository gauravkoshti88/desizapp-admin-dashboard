import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { IoLogOutOutline } from "react-icons/io5";
import { useContext } from "react";
import { adminDataContext } from "../context/AdminContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

function Navbar() {
    const navigate = useNavigate();
    const { setAdminData, setDashboardData } = useContext(adminDataContext);
    const { serverUrl } = useContext(AuthContext);

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
        <nav className="fixed top-0 left-0 w-full z-50 bg-gray-200 text-white shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

                {/* Logo + Text */}
                <div className="flex items-center">
                    <img
                        src={Logo}
                        alt="Admin Logo"
                        className="w-20 h-15 rounded-full cursor-pointer hover:scale-105 transition"
                        onClick={() => navigate("/")}
                    />
                    <div>
                        <p className="text-sm font-bold text-gray-500">Admin Dashboard</p>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
                >
                    <IoLogOutOutline size={20} />
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
