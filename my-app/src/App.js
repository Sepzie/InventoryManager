import './css/App.css'
import { useState } from 'react';
import mockVehicles from './MockVehicles';
import 'react-slideshow-image/dist/styles.css'
import { VehicleDetails, VehicleList } from './VehicleDetails';

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
