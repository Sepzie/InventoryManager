import "./InventoryManager.css"
import mockVehicles from '../MockVehicles';
import 'react-slideshow-image/dist/styles.css'
import { useState } from 'react';
import  VehicleList  from "../vehicle-views/VehicleList";
import  VehicleDetails  from "../vehicle-views/VehicleDetails";

function InventoryManager() {
  var [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <div className="inventory-manager">
      {selectedVehicle && <VehicleDetails vehicle={selectedVehicle} unselectVehicle={() => setSelectedVehicle(null)} />}
      {!selectedVehicle && <VehicleList vehicles={mockVehicles} setSelectedVehicle={setSelectedVehicle} />}
    </div>
  );
}


export default InventoryManager;
