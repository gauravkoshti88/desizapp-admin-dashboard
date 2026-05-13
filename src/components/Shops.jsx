function Shops({ data }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Shops</h2>
      {data.map((shop) => (
        <div
          key={shop._id}
          className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 mb-4"
        >
          <img
            src={shop.image?.url || "/default-shop.png"}
            alt={shop.restaurantName}
            className="w-16 h-16 rounded-lg object-cover border"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold">{shop.restaurantName}</h3>
            <p className="text-sm text-gray-600">
              Owner: {shop.owner?.fullname} ({shop.owner?.email}, {shop.owner?.phone})
            </p>
            <p className="text-sm text-gray-600">
              {shop.city}, {shop.state}
            </p>
            <p
              className={`text-sm font-semibold ${
                shop.shopStatus ? "text-green-600" : "text-red-600"
              }`}
            >
              {shop.shopStatus ? "Active" : "Inactive"}
            </p>
          </div>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Block
          </button>
        </div>
      ))}
    </div>
  );
}

export default Shops;
