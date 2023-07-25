import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 500px;
  min-width: 300px;
  width: 90%;
    margin: 0 auto;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const Label = styled.label`
  flex-basis: 100px;
  margin-right: 10px;
`;

const Input = styled.input`
  flex-grow: 1;
  margin-right: 10px;
`;

const AutoFillButton = styled.button`
  flex-basis: 100px;
`;

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

    const handleAutoFill = async () => {
        try {
            const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${car.vin}?format=json`);
            const data = await response.json();

            if (data.Results && data.Results.length > 0) {
                const result = data.Results[0];
                console.log(result)
                setCar(prevCar => ({
                    ...prevCar,
                    bodyStyle: result.BodyClass,
                    engine: result.EngineCylinders,
                    transmission: result.TransmissionStyle,
                    drivetrain: result.DriveType,
                    // exterior: result.<appropriate field>, // Fill this out based on your API response
                    doors: result.Doors,
                    vin: result.VIN,
                    fuelType: result.FuelTypePrimary,
                    condition: result.VehicleType
                }));
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup>
                <Label>VIN:</Label>
                <Input name="vin" value={car.vin} onChange={handleChange} placeholder="VIN" />
                <AutoFillButton type="button" onClick={handleAutoFill}>Auto-fill</AutoFillButton>
            </InputGroup>
            <InputGroup>
                <Label>Body Style:</Label>
                <Input name="bodyStyle" value={car.bodyStyle} onChange={handleChange} placeholder="Body Style" />
            </InputGroup>
            <InputGroup>
                <Label>Engine:</Label>
                <Input name="engine" value={car.engine} onChange={handleChange} placeholder="Engine" />
            </InputGroup>
            <InputGroup>
                <Label>Transmission:</Label>
                <Input name="transmission" value={car.transmission} onChange={handleChange} placeholder="Transmission" />
            </InputGroup>
            <InputGroup>
                <Label>Drivetrain:</Label>
                <Input name="drivetrain" value={car.drivetrain} onChange={handleChange} placeholder="Drivetrain" />
            </InputGroup>
            <InputGroup>
                <Label>Exterior:</Label>
                <Input name="exterior" value={car.exterior} onChange={handleChange} placeholder="Exterior" />
            </InputGroup>
            <InputGroup>
                <Label>Kilometers:</Label>
                <Input name="kilometers" value={car.kilometers} onChange={handleChange} placeholder="Kilometers" />
            </InputGroup>
            <InputGroup>
                <Label>Doors:</Label>
                <Input name="doors" value={car.doors} onChange={handleChange} placeholder="Doors" />
            </InputGroup>
            <InputGroup>
                <Label>Stock:</Label>
                <Input name="stock" value={car.stock} onChange={handleChange} placeholder="Stock" />
            </InputGroup>
            <InputGroup>
                <Label>Fuel Type:</Label>
                <Input name="fuelType" value={car.fuelType} onChange={handleChange} placeholder="Fuel Type" />
            </InputGroup>
            <InputGroup>
                <Label>Condition:</Label>
                <Input name="condition" value={car.condition} onChange={handleChange} placeholder="Condition" />
            </InputGroup>
            <button type="submit">Add Car</button>
        </Form>
    );
    
};

export default AddCarForm;
