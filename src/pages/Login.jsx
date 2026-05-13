import Logo from '../assets/logo.png';
import axios from 'axios';
import { useContext, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminDataContext } from '../context/AdminContext';

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(AuthContext);
  const {getAdminData, getDashboardState} = useContext(adminDataContext)
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
    try {
      const response = await axios.post(serverUrl+"/api/auth/admin/login", { email, password }, { withCredentials: true });
      setLoading(false);
      getAdminData()
      getDashboardState()
      navigate("/")
    } catch (error) {
      toast.error(`${error.response?.data?.message}`, {
        position: "top-right",
        style: { backgroundColor: "red", color: "white", fontWeight: "bold" }
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-400 to-slate-800 px-4 py-8 sm:px-6 lg:px-8">
      <ToastContainer 
        position="top-right"
        transition={Bounce}
        theme="dark"
        style={{ fontSize: '0.875rem' }}
      />
      
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <img 
            src={Logo} 
            alt="Admin Logo" 
            className="w-20 sm:w-24 md:w-28 mx-auto mb-4 hover:scale-105 transition-transform duration-300 drop-shadow-2xl cursor-pointer" 
            onClick={() => alert("Hii")} 
          />
          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-medium bg-slate-800/90 px-3 sm:px-4 py-2 rounded-xl shadow-lg inline-block">
            Admin Login — DesiZapp Dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-slate-800 mb-6 sm:mb-8 bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
            Welcome Admin
          </h2>
          
          <form className="space-y-4 sm:space-y-5" onSubmit={handleAdminLogin}>
            {/* Email Input */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <input 
                name="email" 
                type="email" 
                placeholder="Email" 
                required 
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl sm:rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-slate-300" 
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  required 
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl sm:rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-slate-300 pr-10 sm:pr-12" 
                />
                <span 
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 hover:text-blue-500 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 
                    <AiOutlineEyeInvisible size={18} className="sm:w-5 sm:h-5" /> : 
                    <AiOutlineEye size={18} className="sm:w-5 sm:h-5" />
                  }
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <ClipLoader size={18} color="white" />
                  <span className="text-sm">Signing in...</span>
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;