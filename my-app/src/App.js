import React from 'react';
import './css/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InventoryManager from './pages/inventory-manager/InventoryManager';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<InventoryManager />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
