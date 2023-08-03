import ImageSlider from './ImageSlider';
import './VehicleDetails.css';
import BackButton from '../../assets/back-arrow.png'


function VehicleDetails({ vehicle, unselectVehicle }) {
  return (
    <div className="details">
      <div className="title-box ">
          <img src={BackButton} className='back-button' onClick={unselectVehicle}></img>
          <h2 className='vehicle-title'>{vehicle.title}</h2>
          <div className='vehicle-cost'>
            <h2>${vehicle.cost}</h2>
            <p>+ Taxes and Licensing</p>
          </div> 
      </div>
      <div className="image-specs-box">
        <div className="image-slider">
          {vehicle.images && <ImageSlider slides={vehicle.images} />}
        </div>
        <div className="box">
          <p className="specs-title">Specifications</p>
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
      </div>

      <div className="details-description-box">
        <h3>Details</h3>
        <p>{vehicle.description}</p>
      </div>

      <form className="request-info-box">
        <RequestInfoSection title="First Name" />
        <RequestInfoSection title="Last Name" />
        <RequestInfoSection title="Phone Number" />
        <RequestInfoSection title="Email" />
        <button className="request-info-button">Request More Info</button>
      </form>
    </div>
  );
}
const InfoColumnRow = ({ title, value }) => {
  return (
    <div>
      <div className="info-row">
        <p className="info-title">{title}:</p>
        <p className="info-value">{value}</p>
      </div>
      <hr className="horizantal-line-specs"></hr>
    </div>

  );
};

const RequestInfoSection = ({ title}) => {
  return(
    <div className="request-info-section">
      <p>{title}</p>
      <input  type="text" className="input-details"/>
  </div>
  );

};


export default VehicleDetails;