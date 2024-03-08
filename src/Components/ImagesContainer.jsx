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
      })
      .catch(error => {
        console.error('Error fetching image URLs:', error);
      });
  }, []);

  return (
    <div className="img-container">
      {imageUrls.map((image, index) => (
        <div className="img-card" key={index}>
          {/* Access the URL using Object.values() */}
          <img src={Object.values(image)[0]} alt={`Image ${index + 1}`} />
          <p>description</p>

          <button className='buttons'>ყიდვა</button>
        </div>
      ))}
    </div>
  );
};

export default ImagesContainer;
