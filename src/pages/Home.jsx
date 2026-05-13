import { useContext, useState } from "react";
import { adminDataContext } from "../context/AdminContext";
import Customers from "../components/Customers";
import Shops from "../components/Shops";
import DeliveryBoys from "../components/DeliveryBoys";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Navbar from "../components/Navbar";

// Chart.js register
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Home() {
    const { dashboardData } = useContext(adminDataContext);
    const [activeTab, setActiveTab] = useState(null);

    if (!dashboardData) return <p className="text-center mt-10">Loading...</p>;

    const { stats } = dashboardData;

    const chartData = {
        labels: Object.keys(stats),
        datasets: [
            {
                label: "Counts",
                data: Object.values(stats),
                backgroundColor: [
                    "#36A2EB",
                    "#FF6384",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                ],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Admin Stats Overview" },
        },
    };

    return (
        <>
            <Navbar />
            <div className="p-8 mt-15">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-center mb-4">Admin Dashboard</h1>
                <p className="text-center text-lg text-gray-600 mb-8">
                    Overview of users, shops, delivery boys and orders
                </p>

                {/* Stats Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {Object.entries(stats).map(([key, value]) => (
                        <div
                            key={key}
                            className="bg-white shadow-lg rounded-xl p-6 text-center border hover:scale-105 transition"
                        >
                            <h2 className="text-xl font-semibold capitalize">{key}</h2>
                            <p className="text-3xl font-bold text-blue-600">{value}</p>
                        </div>
                    ))}
                </div>

                {/* Bar Chart */}
                <div className="bg-white shadow-lg rounded-xl p-6 mb-10">
                    <Bar data={chartData} options={chartOptions} />
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-6 mb-10 border-b pb-6">
                    <button
                        onClick={() => setActiveTab("customers")}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
                    >
                        Customers
                    </button>
                    <button
                        onClick={() => setActiveTab("shops")}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
                    >
                        Shops
                    </button>
                    <button
                        onClick={() => setActiveTab("deliveryBoys")}
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
                    >
                        DeliveryBoys
                    </button>
                </div>

                {/* Conditional Heading + Render */}
                {activeTab && (
                    <h2 className="text-2xl font-bold text-center mb-6 capitalize">
                        {activeTab}
                    </h2>
                )}

                <div className="animate-fadeIn">
                    {activeTab === "customers" && (
                        <Customers data={dashboardData.details.customers} />
                    )}
                    {activeTab === "shops" && <Shops data={dashboardData.details.shops} />}
                    {activeTab === "deliveryBoys" && (
                        <DeliveryBoys data={dashboardData.details.deliveryBoys} />
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;
