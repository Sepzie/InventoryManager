import "./VehicleList.css";
import NoImageAvailable from "../../assets/no-image-avaliable.png";
import SoldOverlay from "../../assets/sold.png";

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

function InfoColumnRow({ title, value, unit = "" }) {
  return (
    <div>
      <div className="info-row">
        <p className="info-title"><strong>{title}:</strong></p>
        <p className="info-value">{value || "N/A"} {unit}</p>
      </div>
    </div>

  );
};


function VehicleCard({ vehicle, setSelectedVehicle, admin, onEdit, onDelete }) {
  return (
    <div className="vehicle-card" onClick={() => setSelectedVehicle(vehicle)}>
      {/* Client Version */}
      <ImageCard vehicle={vehicle} />
      <h3 className="card-title">{vehicle.title || "Car Title Not Found"}</h3>
      <div className="info-box-card">
        <InfoColumnRow title="Body Style" value={vehicle.bodyStyle} />
        <InfoColumnRow title="Mileage" value={vehicle.kilometers} unit="km" />
        <InfoColumnRow title="Color" value={vehicle.exterior} />
        <InfoColumnRow title="Stock #" value={vehicle.stock} />
        <InfoColumnRow title="VIN" value={vehicle.vin} />
      </div>
      <h2 className="card-price">${vehicle.price || "0"}</h2>
      {/* Admin Version */}
      {admin && (
        <div>

          <button onClick={(event) => {
            event.stopPropagation();
            onEdit(vehicle);
          }}>Edit</button>
          <button onClick={(event) => {
            event.stopPropagation();
            onDelete(vehicle);
          }}>Delete</button>
        </div>
      )}
    </div>
  );
}

function ImageCard({ vehicle }) {
  let image;
  if (!Array.isArray(vehicle.images) || vehicle.images.length <= 0) {
    image = NoImageAvailable;
  } else {
    image = vehicle.images[0].downloadURL;
  }

  return (
    <div className="image-card">
      <img className="image-card-item" src={image} alt="vehicle" />
      {vehicle.isSold && (
        <img className="image-card-overlay" src={SoldOverlay} alt="sold overlay" />
      )}
    </div>
  );
}



export default VehicleList;
