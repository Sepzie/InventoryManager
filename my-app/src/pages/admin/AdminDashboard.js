import React from 'react';
import AddCarForm from './AddCarForm';
import CarList from './CarList';

function AdminDashboard() {
    return (
        <div className="AdminDashboard">
            <h1>ADMIN DASHBOARD</h1>
            <AddCarForm />
            <CarList />
        </div>
    );
}

export default AdminDashboard;
