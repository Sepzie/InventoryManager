import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, doc, setDoc, addDoc } from "firebase/firestore"; 

const AddCarForm = () => {
    const [car, setCar] = useState({
        bodyStyle: '',
        engine: '',
        transmission: '',
        drivetrain: '',
        exterior: '',
        kilometers: '',
        doors: '',
        stock: '',
        vin: '',
        fuelType: '',
        condition: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'cars'), car);
            alert('Car added!');
            setCar({
                bodyStyle: '',
                engine: '',
                transmission: '',
                drivetrain: '',
                exterior: '',
                kilometers: '',
                doors: '',
                stock: '',
                vin: '',
                fuelType: '',
                condition: '',
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
             <input name="bodyStyle" value={car.bodyStyle} onChange={handleChange} placeholder="Body Style" />
            <input name="engine" value={car.engine} onChange={handleChange} placeholder="Engine" />
            <input name="transmission" value={car.transmission} onChange={handleChange} placeholder="Transmission" />
            <input name="drivetrain" value={car.drivetrain} onChange={handleChange} placeholder="Drivetrain" />
            <input name="exterior" value={car.exterior} onChange={handleChange} placeholder="Exterior" />
            <input name="kilometers" value={car.kilometers} onChange={handleChange} placeholder="Kilometers" />
            <input name="doors" value={car.doors} onChange={handleChange} placeholder="Doors" />
            <input name="stock" value={car.stock} onChange={handleChange} placeholder="Stock" />
            <input name="vin" value={car.vin} onChange={handleChange} placeholder="VIN" />
            <input name="fuelType" value={car.fuelType} onChange={handleChange} placeholder="Fuel Type" />
            <input name="condition" value={car.condition} onChange={handleChange} placeholder="Condition" />
            <button type="submit">Add Car</button>
        </form>
    );
};

export default AddCarForm;
