import React, { useState } from 'react';
import styled from 'styled-components';

const ImageUploaderContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;


const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px;
  cursor: pointer;
  border: ${(props) => (props.selected ? '2px solid blue' : '1px solid #ccc')};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
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


const ImageUploader = ({ images, setImages }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setImages([...images, { file, downloadURL: objectURL, isNewlyAdded: true }]);
    }
    // Reset the input value
    e.target.value = null;
  };


  const handleRemoveImage = (event) => {
    event.preventDefault();
    if (selectedImageIndex !== null) {
      const updatedImages = [...images];
      if (updatedImages[selectedImageIndex].isNewlyAdded) {
        // Remove newly added image from array
        updatedImages.splice(selectedImageIndex, 1);
      } else {
        // Mark other images for deletion
        updatedImages[selectedImageIndex].toBeDeleted = true;
      }
      setImages(updatedImages);
      setSelectedImageIndex(null);
    }
  };


  const handleMoveImage = (event, direction) => {
    event.preventDefault()
    if (selectedImageIndex !== null) {
      const newImages = [...images];
      const index = direction === 'left' ? selectedImageIndex - 1 : selectedImageIndex + 1;
      if (index >= 0 && index < images.length) {
        [newImages[selectedImageIndex], newImages[index]] = [newImages[index], newImages[selectedImageIndex]];
        setImages(newImages);
        setSelectedImageIndex(index);
      }
    }
  };

  console.log('images: ', images)


  return (
    <ImageUploaderContainer>
      <ImageContainer>
        {images && images.map((image, index) => (
          !image.toBeDeleted && (
            <Image
              key={index}
              src={image.downloadURL}
              alt="Vehicle"
              selected={index === selectedImageIndex}
              onClick={() => setSelectedImageIndex(index)}
            />
          )
        ))}
      </ImageContainer>
      <input type="file" accept="image/*" onChange={handleAddImage} />
      <ButtonContainer>
        <Button onClick={handleRemoveImage}>Remove</Button>
        <Button onClick={(event) => handleMoveImage(event, 'left')}>Left</Button>
        <Button onClick={(event) => handleMoveImage(event, 'right')}>Right</Button>
      </ButtonContainer>
    </ImageUploaderContainer>
  );

};

export default ImageUploader;
