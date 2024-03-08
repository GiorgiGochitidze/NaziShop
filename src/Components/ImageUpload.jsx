// ImageUpload.js

import React, { useState } from 'react';
import axios from 'axios';
import './CSS/ImgUpload.css'
import './CSS/ImagesContainer.css'

const ImageUpload = () => {
    const [image, setImage] = useState({ name: null, url: null });
    const [showImage, setShowImage] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage({ name: file.name, url });
        }
    };

    const handleClick = () => {
        setShowImage(true);
        if (image.url) {
            const { name, url } = image;
            axios.post('http://localhost:5000/api/saveImageUrl', { imageName: name, imageUrl: url })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error saving image URL:', error);
                });
        }
    }

    return ( 
        <div className='image-upload-container'>
            {/* Input field with custom button */}
            <input type="file" name="file" id="file" onChange={handleFileChange} />
            <label htmlFor="file" className="custom-button">აირჩიეთ ფაილი</label>

            {showImage && <img className='choosen-img' src={image.url} alt={image.name} />}
            <button className='buttons' onClick={handleClick}>ატვირთვა</button>
        </div>
     );
}
 
export default ImageUpload;
