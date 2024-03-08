import './CSS/Home.css'
import ImageUpload from './ImageUpload';
import ImagesContainer from './ImagesContainer';
import React, { useState } from 'react';

const Home = () => {

    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    // Function to save the image URL
    const saveImageUrl = (imageUrl) => {
        setUploadedImageUrl(imageUrl);
        // Here you can also save the URL to localStorage, database, etc.
    }

    return ( 
        <main>

            <ImageUpload saveImageUrl={saveImageUrl} />

            <ImagesContainer />
        </main>
     );
}
 
export default Home;