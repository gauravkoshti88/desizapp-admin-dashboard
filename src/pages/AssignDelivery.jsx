import React, { useContext } from 'react'
import { adminDataContext } from '../context/AdminContext';
import DeliveryBoyCard from '../components/DeliveryBoyCard';

function AssignDelivery() {
  const { dashboardData } = useContext(adminDataContext);
  const data = dashboardData?.details?.assignDeliveryBoys || [];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="text-center mb-5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 
            bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            Delivery Assignments
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Track and manage your delivery boys and their assignments
          </p>
        </div>

        <div className="w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 p-6 sm:p-8">
          {data.length > 0 ? (
            <div>
              {data.map((assign) => (
                <DeliveryBoyCard key={assign._id} assign={assign} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">
                No Assignments Found
              </h3>
              <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto">
                Currently there are no delivery assignments. Once new orders are assigned to delivery boys, they will appear here for tracking and management.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignDelivery;
