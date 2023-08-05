import ImageSlider from './ImageSlider';
import './VehicleDetails.css';
import RequestInfoForm from './RequestInfo';
import {TiArrowBack} from 'react-icons/ti';


function VehicleDetails({ vehicle, unselectVehicle }) {
  return (
    <div className="details">
      <div className="title-box">
          <TiArrowBack className='back-button' onClick={unselectVehicle}></TiArrowBack>
          <h2 className='vehicle-title'>{vehicle.title || "Untitled"}</h2>
          <div className='vehicle-cost'>
            <h2>${vehicle.price || "0"} </h2>
            <p>+ Taxes and Licensing</p>
          </div>
      </div>
      <div className="image-specs-box">
        <div className="image-slider">
          {<ImageSlider slides={vehicle.images} />}
        </div>
        <div className="box">
          <p className="specs-title">Specifications</p>
          <div className="info-column">
          <InfoColumnRow title="Engine" value={vehicle.engine} />
          <InfoColumnRow title="Transmission" value={vehicle.transmission} />
          <InfoColumnRow title="Drivetrain" value={vehicle.drivetrain} />
          <InfoColumnRow title="Exterior Color" value={vehicle.exterior} />
          <InfoColumnRow title="Kilometers" value={vehicle.kilometers} />
          <InfoColumnRow title="Doors" value={vehicle.doors} />
          <InfoColumnRow title="Stock #" value={vehicle.stockNumber} />
          <InfoColumnRow title="VIN #" value={vehicle.vin} />
          <InfoColumnRow title="Condition" value={vehicle.condition} />
          </div>
        </div>
      </div>

      <div className="details-description-box">
        <h3>Details</h3>
        <p>{vehicle.description || "No Description"}</p>
      </div>

      <RequestInfoForm vehicleName={vehicle.title}></RequestInfoForm>
    </div>
  );
}
const InfoColumnRow = ({ title, value }) => {
  return (
    <div>
      <div className="info-row">
        <p className="info-title">{title}:</p>
        <p className="info-value">{value || "N/A"}</p>
      </div>
      <hr className="horizantal-line-specs"></hr>
    </div>

  );
};


export default VehicleDetails;