import "./InventoryManager.css"
import 'react-slideshow-image/dist/styles.css'
import { useState, useEffect } from 'react';
import VehicleList from "../vehicle-views/VehicleList";
import VehicleDetails from "../vehicle-views/VehicleDetails";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

function InventoryManager({ admin, onEdit, onDelete }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const vehiclesCollection = collection(db, 'vehicles');
      const vehiclesSnapshot = await getDocs(vehiclesCollection);
      const vehiclesList = vehiclesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setVehicles(vehiclesList);
    };

    fetchVehicles();
  }, []);

  return (
    <div className="inventory-manager">
      {selectedVehicle &&
        <VehicleDetails
          vehicle={selectedVehicle}
          unselectVehicle={() => setSelectedVehicle(null)}
        />}
      {!selectedVehicle &&
        <VehicleList
          vehicles={vehicles}
          setSelectedVehicle={setSelectedVehicle}
          admin={admin}
          onEdit={onEdit}
          onDelete={onDelete}
        />}
    </div>
  );
}


export default InventoryManager;
