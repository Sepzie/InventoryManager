import React from 'react';
import VehicleInfoForm from './VehicleInfoForm';
import CarList from './CarList';
import Login from './Login';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import VehicleList from '../vehicle-views/VehicleList';
import InventoryManager from '../inventory-manager/InventoryManager';
import { db } from '../../firebase';
import { collection, doc, setDoc, addDoc } from "firebase/firestore";

function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [showVehicleForm, setShowVehicleForm] = useState(false);
    const [editVehicle, setEditVehicle] = useState(null);

    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, [auth]);

    if (!user) {
        return <Login />;
    }

    const onAdd = () => {
        setEditVehicle(null);
        setShowVehicleForm(true);
    }

    const onEdit = (vehicle) => {
        setEditVehicle(vehicle);
        setShowVehicleForm(true);
    }

    const onDelete = (vehicle) => {

    }

    const onComplete = async (vehicle) => {
        try {
            if (vehicle.id) {
                // If vehicle has an ID, update the existing document
                await setDoc(doc(db, 'vehicles', vehicle.id), vehicle);
                alert('Vehicle updated!');
            } else {
                // If vehicle doesn't have an ID, add a new document
                await addDoc(collection(db, 'vehicles'), vehicle);
                alert('Vehicle added!');
            }
            setShowVehicleForm(false);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="AdminDashboard">
            <h1>ADMIN DASHBOARD</h1>
            {showVehicleForm ? (
                <VehicleInfoForm editVehicle={editVehicle} onComplete={onComplete} />
            ) : (
                <>
                    <button onClick={onAdd}>Add Vehicle</button>
                    <InventoryManager admin onEdit={onEdit} onDelete={onDelete} />
                </>
            )}
        </div>
    );
}


export default AdminDashboard;
