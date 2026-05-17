import { useContext, useEffect } from "react";
import { adminDataContext } from "../context/AdminContext";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import DeliveryBoyImg from '../assets/Delivery_Boy.png'
import CustomerImg from '../assets/User.png'
import ShopImg from '../assets/Shop.png'

function BlockAccounts() {
  const { blockedUsers, fetchBlockedUsers, getDashboardState } = useContext(adminDataContext);
  const {serverUrl} = useContext(AuthContext)

  console.log(blockedUsers);
  

  const handleUnblockUser = async(email) =>{
    try {
      const res = await axios.post(serverUrl + "/api/admin/unblock-user",{email},{withCredentials:true});
      fetchBlockedUsers();
      getDashboardState();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      <div className='container mx-auto px-4 py-4 max-w-7xl'>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            Blocked Accounts
          </h2>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Manage and unblock suspended user accounts
          </p>
        </div>

        <div className='w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 p-8'>
          {blockedUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-red-100 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">🚫</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                No Blocked Accounts
              </h3>
              <p className="text-lg text-slate-600 max-w-md leading-relaxed">
                All user accounts are active. No accounts have been blocked yet.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {blockedUsers.map((user) => (
                <div
                  key={user.email}
                  className="group bg-gradient-to-br from-slate-50 to-slate-100 shadow-xl hover:shadow-2xl border border-red-200/50 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 overflow-hidden hover:border-red-300 h-full"
                >
                  <div className="flex flex-col justify-between h-full gap-4">
                    {/* Top - Profile Image + Details */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 relative">
                        <img
                          src={user.role == "user" ? CustomerImg : user.role == "foodPartner" ? ShopImg : DeliveryBoyImg}
                          alt={user.fullname}
                          className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-100/50 shadow-2xl border-4 border-white"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-black text-slate-900 mb-1 leading-tight truncate">
                          {user.fullname}
                        </h3>
                        <p className="text-sm text-slate-600 mb-1 truncate">{user.email}</p>
                        <p className="text-sm text-slate-600 truncate">{user.phone}</p>
                      </div>
                      <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-xl hover:shadow-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-[1.02] border-2 border-transparent hover:border-green-400" onClick={()=>handleUnblockUser(user.email)}>
                        Unblock
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlockAccounts;