import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px;
  cursor: pointer;
  border: ${(props) => (props.selected ? '2px solid blue' : 'none')};
`;

const Button = styled.button`
  margin: 5px;
`;

const ImageUploader = ({ images, setImages }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + file.name);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImages([...images, downloadURL]);
    }
  };

  const handleRemoveImage = (event) => {
    event.preventDefault()
    if (selectedImageIndex !== null) {
      const newImages = [...images];
      newImages.splice(selectedImageIndex, 1);
      setImages(newImages);
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

  return (
    <div>
      <ImageContainer>
        {images && images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="Vehicle"
            selected={index === selectedImageIndex}
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </ImageContainer>
      <input type="file" onChange={handleAddImage} />
      <Button onClick={handleRemoveImage}>Remove</Button>
      <Button onClick={(event) => handleMoveImage(event, 'left')}>Left</Button>
      <Button onClick={(event) => handleMoveImage(event, 'right')}>Right</Button>
    </div>
  );
};

export default ImageUploader;
