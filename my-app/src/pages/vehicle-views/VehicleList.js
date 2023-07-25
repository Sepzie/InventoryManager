import "./VehicleList.css"

function VehicleList({ vehicles, setSelectedVehicle }) {
  return (
    <div className="vehicle-list">
      {vehicles.map((vehicle, index) => (
        <VehicleCard key={index} vehicle={vehicle} setSelectedVehicle={setSelectedVehicle} />
      ))}
    </div>
  );
}
function VehicleCard({ vehicle, setSelectedVehicle }) {
  return (
    <div className="vehicle-card">
      <h3>{vehicle.title}</h3>
      <button onClick={() => setSelectedVehicle(vehicle)}>Select</button>
    </div>
  );
}


export default VehicleList;
