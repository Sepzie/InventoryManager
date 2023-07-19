import './App.css';
import { useState } from 'react';
import mockVehicles from './MockVehicles';
import 'react-slideshow-image/dist/styles.css'
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

function VehicleList({ vehicles, setSelectedVehicle }) {
  return (
    <div className="vehicle-list">
      {vehicles.map((vehicle, index) => (
        <VehicleCard key={index} vehicle={vehicle} setSelectedVehicle={setSelectedVehicle} />
      ))}
    </div>
  );
}

const InfoColumnRow = ({title, value}) => {
    return (
      <div className="info-row">
        <p className="title"><strong>{title}:</strong></p>
        <p className="info">{value}</p>
      </div>
    );
}


function VehicleDetails({ vehicle, unselectVehicle }) {
  return (
    <div className="details">
        <div className="image-slider">
          <ImageSlider slides={vehicle.images} />
        </div>
        <div className="box">
          <h2>{vehicle.year} {vehicle.make} {vehicle.model}</h2>
          <h4>${vehicle.price}</h4>
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
        <h3>Description</h3>
        <p>{vehicle.description}</p>
      </div>
      <div className="financing-calculator-section">
        <FinancingCalculator price={vehicle.price} />
      </div>
      <div className="details-back-button">
            <button onClick={unselectVehicle} >Back</button>
      </div>
    </div>
  );
}




function App() {
  var [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <div className="App">
      {selectedVehicle && <VehicleDetails vehicle={selectedVehicle} unselectVehicle={() => setSelectedVehicle(null)} />}
      {!selectedVehicle && <VehicleList vehicles={mockVehicles} setSelectedVehicle={setSelectedVehicle} />}
    </div>
  );
}

export default App;
