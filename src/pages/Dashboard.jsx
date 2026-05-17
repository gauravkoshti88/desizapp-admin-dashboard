import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    MdPeople,
    MdStore,
    MdLocalShipping,
    MdAssignmentInd,
    MdVerifiedUser,
    MdBlock,
} from "react-icons/md";
import { IoBagHandleSharp } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function AdminDashboard() {
    const { serverUrl } = useContext(AuthContext)
    const { dashboardData } = useContext(adminDataContext);

    if (!dashboardData) return <p className="text-center mt-10">Loading...</p>;

    const { stats, details } = dashboardData;

    // Chart Data
    const chartData = {
        labels: Object.keys(stats),
        datasets: [
            {
                label: "Counts",
                data: Object.values(stats),
                backgroundColor: [
                    "#36A2EB",
                    "#4BC0C0",
                    "#FFCE56",
                    "#FF6384",
                    "#9966FF",
                ],
                borderRadius: 5,
                borderSkipped: false,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Admin Stats Overview" },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1, precision: 0 },
                grid: { color: "rgba(0,0,0,0.05)" },
            },
            x: { grid: { display: false } },
        },
    };

    // Delivery Boy Activity Chart
    const deliveryActivityData = {
        labels: ["Active", "Offline"],
        datasets: [
            {
                data: [65, 35],
                backgroundColor: ["#4BC0C0", "#FF6384"],
                borderWidth: 0,
            },
        ],
    };

    const getIcon = (key) => {
        const normalizedKey = key.toLowerCase();
        if (normalizedKey.includes("user")) return <MdPeople className="w-10 h-10 text-blue-500" />;
        if (normalizedKey.includes("foodpartner") || normalizedKey.includes("shop"))
            return <MdStore className="w-10 h-10 text-green-500" />;
        if (normalizedKey.includes("delivery")) return <MdLocalShipping className="w-10 h-10 text-orange-500" />;
        if (normalizedKey.includes("order")) return <IoBagHandleSharp className="w-10 h-10 text-purple-500" />;
        if (normalizedKey.includes("assign")) return <MdAssignmentInd className="w-10 h-10 text-teal-500" />;
        return <MdVerifiedUser className="w-10 h-10 text-gray-500" />;
    };

    return (
        <div className="p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg leading-tight">
                    Admin Dashboard
                </h1>
                <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
                    Welcome back, Admin! Here's what's happening with your platform today.
                </p>
            </div>

            {/* Stats Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
                {Object.entries(stats).map(([key, value]) => (
                    <div
                        key={key}
                        className="bg-white shadow-lg rounded-xl p-4 text-center border hover:scale-105 transition"
                    >
                        <div className="flex justify-center mb-3">{getIcon(key)}</div>
                        <h2 className="text-lg font-semibold capitalize">{key}</h2>
                        <p className="text-2xl font-bold text-blue-600">{value}</p>
                    </div>
                ))}
            </div>

            {/* Chart + Side Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Overview</h2>
                    <div className="w-full h-[400px]">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>

                {/* Top Performing Shops */}
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Top Performing Shops</h2>
                    <ul className="space-y-3">
                        {details.shops && details.shops.length > 0 ? (
                            details.shops.map((shop, idx) => (
                                <li key={idx} className="flex justify-between border-b pb-2">
                                    <span>{shop.restaurantName}</span>
                                    <span className="font-bold text-green-600">#{idx + 1}</span>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500">No shop data available</p>
                        )}
                    </ul>
                </div>
            </div>

            {/* Bottom Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                    <ul className="space-y-3">
                        {details.recentOrders && details.recentOrders.length > 0 ? (
                            details.recentOrders.map((order) => (
                                <li key={order._id} className="flex justify-between border-b pb-2">
                                    <p>#{order._id?.slice(-5).toUpperCase()} <span className="font-bold">{order.customer?.fullname}</span></p>
                                    <span className="text-blue-600 font-medium">
                                        {order.shopOrders?.[0]?.status.toUpperCase()}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500">No recent orders</p>
                        )}
                    </ul>
                </div>

                {/* Delivery Boy Activity */}
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Delivery Boy Activity</h2>

                    {(details.deliveryActivity?.online || 0) === 0 &&
                        (details.deliveryActivity?.busy || 0) === 0 ? (
                        // Agar active/busy dono 0 hain
                        <p className="text-center text-gray-500 font-medium">
                            No delivery boys are currently active.
                        </p>
                    ) : (
                        <>
                            <div className="w-48 mx-auto">
                                <Doughnut
                                    data={{
                                        labels: ["Online", "Offline", "Busy"],
                                        datasets: [
                                            {
                                                data: [
                                                    details.deliveryActivity?.online || 0,
                                                    details.deliveryActivity?.offline || 0,
                                                    stats.totalAssignDeliveryBoys || 0,
                                                ],
                                                backgroundColor: ["#4BC0C0", "#FF6384", "#FFCE56"],
                                                borderWidth: 0,
                                            },
                                        ],
                                    }}
                                />
                            </div>
                            <div className="text-center mt-4">
                                <p className="text-gray-700 font-medium">
                                    Online: {details.deliveryActivity?.online || 0} |
                                    Offline: {details.deliveryActivity?.offline || 0} |
                                    Busy: {stats.totalAssignDeliveryBoys || 0}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
