import UserCard from "./UserCard";

function DeliveryBoys({ data }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Delivery Boys</h2>
      {data.map((boy) => (
        <UserCard key={boy._id} {...boy} />
      ))}
    </div>
  );
}

export default DeliveryBoys;
