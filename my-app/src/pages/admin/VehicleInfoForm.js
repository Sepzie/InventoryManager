import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import ImageUploader from './ImageUploader';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';



const Form = styled.form`
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
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
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AutoFillButton = styled.button`
  flex-basis: 100px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const Button = styled.button`
  margin: 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;


const VehicleInfoForm = ({ editVehicle, onComplete }) => {
    const [vehicle, setVehicle] = useState({
        title: '',
        price: '',
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
        description: '',
        images: []
    });

    const pageTitle = editVehicle ? 'Edit Vehicle' : 'Add Vehicle';
    const buttonText = editVehicle ? 'Update Vehicle' : 'Add Vehicle';

    useEffect(() => {
        if (editVehicle) {
            setVehicle(editVehicle);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userConfirmed = window.confirm("Are you sure you want to submit the changes?");
        if (!userConfirmed) return; // If user cancels, stop execution

        // Prepare promises for handling images
        const storage = getStorage();
        const imagesPromises = vehicle.images.map(async (image) => {
            if (image.toBeDeleted) {
                // Handle image deletion
                try {
                    const imageRef = ref(storage, image.storagePath);
                    await deleteObject(imageRef).catch((error) => {
                        console.error("Error deleting the image from cloud storage: ", error);
                    });
                } catch (error) {
                    console.log('Error deleting image: ', error.message);
                }
                return null; // Return null for images to be deleted
            }

            if (image.file) {
                // Handle image upload
                const storageRef = ref(storage, 'images/' + image.file.name);
                const snapshot = await uploadBytes(storageRef, image.file);
                const downloadURL = await getDownloadURL(snapshot.ref);
                return { downloadURL, storagePath: 'images/' + image.file.name };
            }

            return image; // Already uploaded images remain unchanged
        });

        const finalImages = await Promise.all(imagesPromises);
        const cleanedImages = finalImages.filter((image) => image !== null); // Remove null (deleted) images

        // Final vehicle object with updated images
        const finalVehicle = { ...vehicle, images: cleanedImages };

        // Finalize vehicle changes (e.g., save to database)
        onComplete(finalVehicle);
    };

    const handleCancel = (e) => {
        e.preventDefault();

        const userConfirmed = window.confirm("Are you sure you want to cancel? All changes will be lost.");
        if (!userConfirmed) return; // If user cancels, stop execution

        onComplete(null);
    };
    const handleChange = (e) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    const handleAutoFill = async () => {
        try {
            const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vehicle.vin}?format=json`);
            const data = await response.json();

            if (data.Results && data.Results.length > 0) {
                const result = data.Results[0];
                console.log(result)
                setVehicle(prevVehicle => ({
                    ...prevVehicle,
                    bodyStyle: result.BodyClass !== "" ? result.BodyClass : prevVehicle.bodyStyle,
                    engine: result.EngineCylinders !== "" ? result.EngineCylinders : prevVehicle.engine,
                    transmission: result.TransmissionStyle !== "" ? result.TransmissionStyle : prevVehicle.transmission,
                    drivetrain: result.DriveType !== "" ? result.DriveType : prevVehicle.drivetrain,
                    // exterior: result.<appropriate field> !== "" ? result.<appropriate field> : prevVehicle.exterior, // Fill this out based on your API response
                    doors: result.Doors !== "" ? result.Doors : prevVehicle.doors,
                    vin: result.VIN !== "" ? result.VIN : prevVehicle.vin,
                    fuelType: result.FuelTypePrimary !== "" ? result.FuelTypePrimary : prevVehicle.fuelType,
                    condition: result.VehicleType !== "" ? result.VehicleType : prevVehicle.condition
                }));
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>{pageTitle}</h2>
            <InputGroup>
                <Label>Title:</Label>
                <Input name="title" value={vehicle.title} onChange={handleChange} placeholder="Title" />
            </InputGroup>
            <InputGroup>
                <Label>Price:</Label>
                <Input name="price" value={vehicle.price} onChange={handleChange} placeholder="Price" />
            </InputGroup>
            <InputGroup>
                <Label>VIN:</Label>
                <Input name="vin" value={vehicle.vin} onChange={handleChange} placeholder="VIN" />
                <AutoFillButton type="button" onClick={handleAutoFill}>Auto-fill</AutoFillButton>
            </InputGroup>
            <InputGroup>
                <Label>Body Style:</Label>
                <Input name="bodyStyle" value={vehicle.bodyStyle} onChange={handleChange} placeholder="Body Style" />
            </InputGroup>
            <InputGroup>
                <Label>Engine:</Label>
                <Input name="engine" value={vehicle.engine} onChange={handleChange} placeholder="Engine" />
            </InputGroup>
            <InputGroup>
                <Label>Transmission:</Label>
                <Input name="transmission" value={vehicle.transmission} onChange={handleChange} placeholder="Transmission" />
            </InputGroup>
            <InputGroup>
                <Label>Drivetrain:</Label>
                <Input name="drivetrain" value={vehicle.drivetrain} onChange={handleChange} placeholder="Drivetrain" />
            </InputGroup>
            <InputGroup>
                <Label>Exterior:</Label>
                <Input name="exterior" value={vehicle.exterior} onChange={handleChange} placeholder="Exterior" />
            </InputGroup>
            <InputGroup>
                <Label>Kilometers:</Label>
                <Input name="kilometers" value={vehicle.kilometers} onChange={handleChange} placeholder="Kilometers" />
            </InputGroup>
            <InputGroup>
                <Label>Doors:</Label>
                <Input name="doors" value={vehicle.doors} onChange={handleChange} placeholder="Doors" />
            </InputGroup>
            <InputGroup>
                <Label>Stock:</Label>
                <Input name="stock" value={vehicle.stock} onChange={handleChange} placeholder="Stock" />
            </InputGroup>
            <InputGroup>
                <Label>Fuel Type:</Label>
                <Input name="fuelType" value={vehicle.fuelType} onChange={handleChange} placeholder="Fuel Type" />
            </InputGroup>
            <InputGroup>
                <Label>Condition:</Label>
                <Input name="condition" value={vehicle.condition} onChange={handleChange} placeholder="Condition" />
            </InputGroup>
            <InputGroup>
                <Label>Description:</Label>
                <Input name="description" value={vehicle.description} onChange={handleChange} placeholder="Description" />
            </InputGroup>
            <ImageUploader images={vehicle.images} setImages={(images) => setVehicle({ ...vehicle, images })} />
            <ButtonGroup>
                <Button type="button" onClick={handleCancel}>Cancel</Button>
                <Button type="submit">{buttonText}</Button>
            </ButtonGroup>
        </Form>
    );

};

export default VehicleInfoForm;
