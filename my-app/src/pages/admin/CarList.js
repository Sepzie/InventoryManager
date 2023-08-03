import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore"; 

const carsRef = collection(db, "cars");


const CarList = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const carCollection = collection(db, "cars");
            const carSnapshot = await getDocs(carCollection);
            const carList = carSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setCars(carList);
        };
        
        fetchData();
    }, []);

    const handleDelete = (id) => {
        carsRef.doc(id).delete();
    };

    const handleEdit = (id) => {
        // For now, just log. This is where you'd implement your edit functionality.
        console.log(id);
    };

    return (
        <div>
            {cars.map(car => (
                <div key={car.id}>
                    <h2>{car.bodyStyle}</h2>
                    {/* Display other fields here */}
                    <button onClick={() => handleEdit(car.id)}>Edit</button>
                    <button onClick={() => handleDelete(car.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default CarList;
