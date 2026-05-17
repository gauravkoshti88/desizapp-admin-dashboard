import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
import DeliveryBoyImg from '../assets/Delivery_Boy.png'
import CustomerImg from '../assets/User.png'

function UserCard({ fullname, email, phone, profileImage, isOnline, _id, role }) {
  const [showBlockInput, setShowBlockInput] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const { serverUrl } = useContext(AuthContext);
  const { getDashboardState, fetchBlockedUsers } = useContext(adminDataContext)
 
  const handleBlockUser = async () => {
    try {
      const res = await axios.post(serverUrl + "/api/admin/block-user", {
        userId: _id,
        reason: blockReason || "No reason provided"
      },{withCredentials:true});

      if (res.data.success) {
        setShowBlockInput(false);
        setBlockReason("");
        getDashboardState();
        fetchBlockedUsers();
      }
    } catch (error) {
      setShowBlockInput(false);
    }
  };

  return (
    <div className="group bg-gradient-to-br from-white to-slate-50 shadow-lg hover:shadow-2xl border border-slate-200/50 rounded-2xl p-4 hover:-translate-y-1 transition-all duration-300 overflow-hidden hover:border-slate-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 relative">
            <img
              src={profileImage?.url || `${role == "user" ? CustomerImg : DeliveryBoyImg}`}
              alt={fullname}
              className="w-14 h-14 rounded-xl object-cover ring-2 ring-white/50 shadow-md"
            />
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full border-3 border-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 ${
                isOnline
                  ? "bg-green-400 shadow-green-200"
                  : "bg-red-400 shadow-red-200"
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  isOnline ? "bg-green-500 animate-ping" : "bg-red-500"
                }`}
              ></div>
            </div>
          </div>

          <div className="flex-1 min-w-0 py-1">
            <h3 className="text-sm font-black text-slate-900 truncate mb-1 leading-tight">
              {fullname}
            </h3>
            <p className="text-xs text-slate-600 mb-0.5 truncate">{email}</p>
            <p className="text-xs text-slate-600 truncate">{phone}</p>
          </div>

          <div
            className={`flex-shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold shadow-sm transition-all ${
              isOnline
                ? "bg-green-100 text-green-800 shadow-green-100 hover:bg-green-200"
                : "bg-red-100 text-red-800 shadow-red-100 hover:bg-red-200"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full mr-1 ${
                isOnline ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span>{isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>

        <div className="flex-shrink-0">
          {!showBlockInput ? (
            <button
              onClick={() => setShowBlockInput(true)}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
            >
              Block User
            </button>
          ) : (
            <div className="bg-white border border-red-300 rounded-xl p-3 shadow-md">
              <h4 className="text-sm font-bold text-red-600 mb-2">
                Block Reason
              </h4>
              <input
                type="text"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Enter reason..."
                className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <button
                onClick={handleBlockUser}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow hover:from-red-600 hover:to-red-700 transition-all duration-200"
              >
                Confirm Block
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
