import React, { useEffect } from 'react';
import './css/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InventoryManager from './pages/inventory-manager/InventoryManager';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  
  useEffect(() => {
    // This function sends the height to the parent frame
    const sendHeightToParent = () => {
      const body = document.body,
            html = document.documentElement;

      const height = Math.max(body.scrollHeight, body.offsetHeight, 
                              html.clientHeight, html.scrollHeight, html.offsetHeight);

      // Post the height to the parent window
      window.parent.postMessage({ iframeHeight: height }, '*');
    };

    // Call the function once initially
    sendHeightToParent();

    // Additionally, you can call the function upon window resize, 
    // though this might not capture all types of content changes
    window.addEventListener('resize', sendHeightToParent);

    // Cleanup listener upon unmounting
    return () => {
      window.removeEventListener('resize', sendHeightToParent);
    };
  }, []); // Empty dependency array means this useEffect runs once when the component mounts
  
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
