import './css/App.css'
import { useState } from 'react';
import mockVehicles from './MockVehicles';
import 'react-slideshow-image/dist/styles.css'
import { VehicleDetails, VehicleList } from './VehicleDetails';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InventoryManager from './pages/InventoryManager';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  var [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InventoryManager />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
