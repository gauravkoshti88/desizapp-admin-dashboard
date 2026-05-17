import React from "react";

function DeliveryBoyCard({ assign }) {
  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl p-3 mb-3 overflow-hidden">
      {/* Delivery Boy Header */}
      <div className="flex items-start justify-between mb-2.5 pr-2">
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent truncate">
            {assign.assignTo?.fullname}
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5 truncate">
            Delivery Boy • {assign.assignTo?.phone}
          </p>
        </div>
        <div className="flex-shrink-0 ml-2">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
            #{assign.assignTo?._id?.slice(-5)}
          </span>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 mb-3">
        {/* Shop Info */}
        <div className="group bg-white/60 backdrop-blur-sm border border-green-100 rounded-lg p-2.5 hover:border-green-200 transition-colors">
          <div className="flex items-center mb-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
            <h3 className="text-xs font-bold text-green-600 group-hover:text-green-700">Shop</h3>
          </div>
          <p className="text-xs text-slate-700 font-medium truncate">
            {assign.shop?.restaurantName}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {assign.shop?.owner?.phone}
          </p>
        </div>

        {/* Customer Info */}
        <div className="group bg-white/60 backdrop-blur-sm border border-purple-100 rounded-lg p-2.5 hover:border-purple-200 transition-colors">
          <div className="flex items-center mb-1.5">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-1.5"></div>
            <h3 className="text-xs font-bold text-purple-600 group-hover:text-purple-700">Customer</h3>
          </div>
          <p className="text-xs text-slate-700 font-medium truncate">
            {assign.order?.customer?.fullname}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {assign.order?.customer?.phone}
          </p>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-lg p-2.5 hover:shadow-sm transition-all">
        <div className="flex items-center mb-1.5">
          <div className="w-2 h-2 bg-orange-500 rounded-full mr-1.5"></div>
          <h3 className="text-xs font-bold text-orange-600">Delivery Address</h3>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed line-clamp-2">
          {assign.order?.deliveryAddress?.text}
        </p>
      </div>
    </div>
  );
}

export default DeliveryBoyCard;