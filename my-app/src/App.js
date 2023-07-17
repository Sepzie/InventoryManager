import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


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

function VehicleDetails({ vehicle, unselectVehicle }) {
  return (
    <div className="vehicle-card">
      <h3>{vehicle.make} {vehicle.model}</h3>
      <p>Year: {vehicle.year}</p>
      <p>Price: ${vehicle.price}</p>
      <button onClick={unselectVehicle}>back</button>
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


const mockVehicles = [
  {
    make: 'Ford',
    model: 'Mustang',
    year: 2023,
    price: 35000
  },
  {
    make: 'Chevrolet',
    model: 'Camaro',
    year: 2023,
    price: 37000
  },
  {
    make: 'Dodge',
    model: 'Charger',
    year: 2023,
    price: 40000
  },
  {
    make: 'Tesla',
    model: 'Model S',
    year: 2023,
    price: 80000
  },
  {
    make: 'Honda',
    model: 'Civic',
    year: 2023,
    price: 25000
  },
];

export default App;
