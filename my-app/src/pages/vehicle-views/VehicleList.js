import "./VehicleList.css"

function VehicleList({ vehicles, setSelectedVehicle, admin, onEdit, onDelete }) {
  return (
    <div className="vehicle-list">
      {vehicles.map((vehicle, index) => (
        <VehicleCard
          key={index}
          vehicle={vehicle}
          setSelectedVehicle={setSelectedVehicle}
          admin={admin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function VehicleCard({ vehicle, setSelectedVehicle, admin, onEdit, onDelete }) {
  console.log(vehicle)
  return (
    <div className="vehicle-card">
      <h3>{vehicle.title}</h3>
      <button onClick={() => setSelectedVehicle(vehicle)}>Select</button>
      {admin && (
        <div>
          <button onClick={() => onEdit(vehicle)}>Edit</button>
          <button onClick={() => onDelete(vehicle)}>Delete</button>
        </div>
      )}
    </div>
  );
}



export default VehicleList;
