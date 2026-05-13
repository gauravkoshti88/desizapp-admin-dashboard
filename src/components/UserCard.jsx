function UserCard({ fullname, email, phone, profileImage, isOnline }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 mb-4">
      <img
        src={profileImage?.url || "/default.png"}
        alt={fullname}
        className="w-16 h-16 rounded-full object-cover border"
      />
      <div className="flex-1">
        <h3 className="text-lg font-bold">{fullname}</h3>
        <p className="text-sm text-gray-600">{email}</p>
        <p className="text-sm text-gray-600">{phone}</p>
        <p
          className={`text-sm font-semibold ${
            isOnline ? "text-green-600" : "text-red-600"
          }`}
        >
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
        Block
      </button>
    </div>
  );
}

export default UserCard;
