import "./VehicleList.css";
import {NoImageAvaliable} from "../../assets/no-image-avaliable.png";

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
  return (
    <div className="vehicle-card">
      {/* Client Version */}
      <ImageCard vehicle={vehicle} />
      <h3>{vehicle.title}</h3>
      <button onClick={() => setSelectedVehicle(vehicle)} 
      className="select-vehicle-button">Select</button>

      {/* Admin Version */}
      {admin && (
        <div>
          <button onClick={() => onEdit(vehicle)}>Edit</button>
          <button onClick={() => onDelete(vehicle)}>Delete</button>
        </div>
      )}
    </div>
  );
}

function ImageCard({vehicle}) {

  if (!Array.isArray(vehicle.images) || vehicle.images.length <= 0) {
    return(
      <div className="image-card">
        <img className="image-card-item" src={NoImageAvaliable} alt={vehicle.title} />
      </div>
    )
  } 

  return (
    <div className="image-card">
      <img className="image-card-item" src={vehicle.images[0]} alt={vehicle.title} />
    </div>

  )
}



export default VehicleList;
