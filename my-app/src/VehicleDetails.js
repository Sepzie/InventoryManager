import ImageSlider from './ImageSlider';
import FinancingCalculator from './FinancingCalculator';

function VehicleCard({ vehicle, setSelectedVehicle }) {
  return (
    <div className="vehicle-card">
      <h3>{vehicle.make} {vehicle.model}</h3>
      <p>Year: {vehicle.year}</p>
      <p>Price: ${vehicle.price}</p>
      <button onClick={() => setSelectedVehicle(vehicle)}>Select</button>
    </div>
  );
}
export function VehicleList({ vehicles, setSelectedVehicle }) {
  return (
    <div className="vehicle-list">
      {vehicles.map((vehicle, index) => (
        <VehicleCard key={index} vehicle={vehicle} setSelectedVehicle={setSelectedVehicle} />
      ))}
    </div>
  );
}
const InfoColumnRow = ({ title, value }) => {
  return (
    <div className="info-row">
      <p className="info-title"><strong>{title}:</strong></p>
      <p className="info">{value}</p>
    </div>
  );
};
export function VehicleDetails({ vehicle, unselectVehicle }) {
  return (
    <div className="details">
      <div className="details-title">
        <h2>{vehicle.year} {vehicle.make} {vehicle.model}</h2>
      </div>
      <div className="details-title">
        <h2>${vehicle.price}</h2>
      </div>
      <div className="image-slider">
        <ImageSlider slides={vehicle.images} />
      </div>
      <div className="box">
        <div className="info-column">
          <InfoColumnRow title="Body Style" value={vehicle.bodyStyle} />
          <InfoColumnRow title="Engine" value={vehicle.engine} />
          <InfoColumnRow title="Transmission" value={vehicle.transmission} />
          <InfoColumnRow title="Drivetrain" value={vehicle.drivetrain} />
          <InfoColumnRow title="Exterior" value={vehicle.exterior} />
          <InfoColumnRow title="Kilometers" value={vehicle.kilometers} />
          <InfoColumnRow title="Doors" value={vehicle.doors} />
          <InfoColumnRow title="Stock #" value={vehicle.stock} />
          <InfoColumnRow title="VIN #" value={vehicle.vin} />
          <InfoColumnRow title="Fuel Type" value={vehicle.fuelType} />
          <InfoColumnRow title="Condition" value={vehicle.condition} />
        </div>
      </div>
      <div className="details-description">
        <h3>Details</h3>
        <p>{vehicle.description}</p>
      </div>
      <div className="financing-calculator-section">
        <FinancingCalculator price={vehicle.price} />
      </div>
      <div className="details-back-button">
        <button onClick={unselectVehicle}>Back to Vehicle List</button>
      </div>
    </div>
  );
}
