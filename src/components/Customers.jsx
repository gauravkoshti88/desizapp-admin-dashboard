import UserCard from "./UserCard";


function Customers({ data }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Customers</h2>
      {data.map((user) => (
        <UserCard key={user._id} {...user} />
      ))}
    </div>
  );
}

export default Customers;
