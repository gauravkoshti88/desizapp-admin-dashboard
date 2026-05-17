import { useContext } from "react";
import UserCard from "../components/UserCard";
import { adminDataContext } from "../context/AdminContext";

function DeliveryBoys() {
  const { dashboardData } = useContext(adminDataContext);
  const data = dashboardData?.details?.deliveryBoys || [];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 
            bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            Delivery Boys
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Manage your delivery team and track their performance
          </p>
        </div>

        <div className="w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 p-6 sm:p-8">
          {data.length > 0 ? (
            <div>
              {data.map((boy) => (
                <UserCard key={boy._id} {...boy} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">
                No Delivery Boys Found
              </h3>
              <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto">
                Your delivery team list is currently empty. Once new delivery boys join, they will appear here for management and tracking.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeliveryBoys;
