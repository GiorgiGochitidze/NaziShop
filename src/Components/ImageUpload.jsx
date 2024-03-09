import React, { useState } from 'react';
import axios from 'axios';
import './CSS/ImgUpload.css';
import './CSS/ImagesContainer.css';

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleClick = () => {
        if (image && description) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('description', description); // Append the image description to the form data

            axios.post('http://localhost:5000/api/saveImageUrl', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                console.log(response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error saving image:', error);
            });
        }
    };

    return ( 
        <div className='image-upload-container'>
            {/* Input field with custom button */}
            <input type="file" name="file" id="file" onChange={handleFileChange} />
            <label htmlFor="file" className="custom-button">აირჩიეთ ფაილი</label>

            {/* Show the selected image */}
            {image && <img className='choosen-img' src={URL.createObjectURL(image)} alt={image.name} />}

            <input type="text" placeholder='შეიყვანეთ აღწერა' value={description} onChange={handleDescriptionChange} />
            <button className='buttons' onClick={handleClick}>ატვირთვა</button>
        </div>
     );
};
 
export default ImageUpload;
