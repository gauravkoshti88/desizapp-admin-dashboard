import { useState, useContext } from "react";
import { adminDataContext } from "../context/AdminContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import ShopImg from '../assets/Shop.png'

function Shops() {
  const { dashboardData, getDashboardState, fetchBlockedUsers } = useContext(adminDataContext);
  const data = dashboardData?.details?.shops || [];
  const { serverUrl } = useContext(AuthContext);
  const [showBlockInput, setShowBlockInput] = useState(null);
  const [blockReason, setBlockReason] = useState("");

  const handleBlockShop = async (userId) => {
    try {
      const res = await axios.post(
        serverUrl + "/api/admin/block-user",
        {
          userId,
          reason: blockReason || "No reason provided",
        },
        { withCredentials: true }
      );

      if (res.data) {
        setShowBlockInput(null);
        setBlockReason("");
        fetchBlockedUsers();
        getDashboardState();
      }
    } catch (error) {
      console.error("Block shop error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 
            bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            Shops
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Manage restaurants and track their activity
          </p>
        </div>

        <div className="w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 p-4 sm:p-6 lg:p-8">
          {data.length > 0 ? (
            <div>
              {data.map((shop) => (
                <div
                  key={shop._id}
                  className="group bg-gradient-to-br from-white to-slate-50 shadow-lg hover:shadow-2xl 
                    border border-slate-200/50 rounded-2xl p-4 sm:p-5 lg:p-6 
                    hover:-translate-y-1 transition-all duration-300 overflow-hidden hover:border-slate-300"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 h-full">
                    <div className="flex-shrink-0">
                      <img
                        src={shop.image?.url|| ShopImg}
                        alt={shop.restaurantName}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-white/50 shadow-lg"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 truncate mb-1.5 leading-tight">
                        {shop.restaurantName}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        {shop.owner?.fullname}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 truncate max-w-[160px]">
                        {shop.owner?.email}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 truncate max-w-[160px]">
                        {shop.owner?.phone}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600">
                        {shop.city}, {shop.state}
                      </p>
                    </div>

                    <div className="flex flex-col items-center sm:items-end gap-3 flex-shrink-0 w-full sm:w-auto">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all ${
                        shop.shopStatus
                          ? "bg-green-100 text-green-800 shadow-green-200 hover:bg-green-200"
                          : "bg-red-100 text-red-800 shadow-red-200 hover:bg-red-200"
                      }`}>
                        <div className={`w-2 h-2 rounded-full mr-1.5 ${
                          shop.shopStatus ? "bg-green-500" : "bg-red-500"
                        }`}></div>
                        {shop.shopStatus ? "Active" : "Inactive"}
                      </div>

                      {showBlockInput === shop._id ? (
                        <div className="bg-white border border-red-300 rounded-xl p-3 shadow-md w-full sm:w-auto">
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
                            onClick={() => handleBlockShop(shop?.owner?._id)}
                            className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 text-white text-xs sm:text-sm font-bold py-1.5 px-3 rounded-lg shadow hover:from-red-600 hover:to-red-700 transition-all duration-200"
                          >
                            Confirm Block
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowBlockInput(shop._id)}
                          className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 text-white text-xs sm:text-sm font-bold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                        >
                          Block Shop
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">
                No Shops Found
              </h3>
              <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto">
                Your shop list is currently empty. Once new restaurants are added, they will appear here for management and tracking.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shops;
