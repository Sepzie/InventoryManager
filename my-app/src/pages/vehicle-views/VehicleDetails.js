import ImageSlider from './ImageSlider';
import FinancingCalculator from '../inventory-manager/FinancingCalculator';
import './VehicleDetails.css';


function VehicleDetails({ vehicle, unselectVehicle }) {
  return (
    <div className="details">
      <div className="title-box ">
          <img src="../../assets/back-arrow.png"></img>
          <h2>{vehicle.title}</h2>
          <h2>${vehicle.cost}</h2>
      </div>
      <div className="image-slider">
        <ImageSlider slides={vehicle.images} />
      </div>
      <div className="box">
        <div className="info-column">
        <InfoColumnRow title="Engine" value={vehicle.engine} />
        <InfoColumnRow title="Transmission" value={vehicle.transmission} />
        <InfoColumnRow title="Drivetrain" value={vehicle.drivetrain} />
        <InfoColumnRow title="Exterior" value={vehicle.exterior} />
        <InfoColumnRow title="Kilometers" value={vehicle.kilometers} />
        <InfoColumnRow title="Doors" value={vehicle.doors} />
        <InfoColumnRow title="Stock #" value={vehicle.stockNumber} />
        <InfoColumnRow title="VIN #" value={vehicle.vin} />
        <InfoColumnRow title="Condition" value={vehicle.condition} />
        </div>
      </div>
      <div className="details-description">
        <h3>Details</h3>
        <p>{vehicle.description}</p>
      </div>
      <div className="details-back-button">
        <button onClick={unselectVehicle}>Back to Vehicle List</button>
      </div>
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


export default VehicleDetails;