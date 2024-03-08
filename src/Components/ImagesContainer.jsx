import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CSS/ImagesContainer.css";

const ImagesContainer = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Fetch image URLs from backend when the component mounts
    axios.get('https://nazishop.onrender.com/api/getImageUrls')
      .then(response => {
        setImageUrls(response.data);
        console.log('Successfully fetched image URLs:', response.data); // Add console.log here
      })
      .catch(error => {
        console.error('Error fetching image URLs:', error);
      });
  }, []);

  const deleteImage = (imageName) => {
    // Delete image from backend
    axios.delete(`https://nazishop.onrender.com/api/deleteImage/${imageName}`)
      .then(response => {
        console.log(response.data);
        // Remove the deleted image from the imageUrls state
        setImageUrls(prevState => prevState.filter(image => Object.keys(image)[0] !== imageName));
      })
      .catch(error => {
        console.error('Error deleting image:', error);
      });
  };

  return (
    <div className="img-container">
      {imageUrls.map((image, index) => {
        const imageName = Object.keys(image)[0];
        const imageUrl = `https://nazishop.onrender.com/api/images/${imageName}`; // Construct the image URL
        return (
          <div className="img-card" key={index}>
            <img src={imageUrl} alt={`Image ${index + 1}`} />
            <p>description</p>
            <button className='buttons'>ყიდვა</button>
            <button className='del-button' onClick={() => deleteImage(imageName)}>X</button>
          </div>
        );
      })}
    </div>
  );
};

export default ImagesContainer;
