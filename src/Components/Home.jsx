import React from "react";
import { useParams } from "react-router-dom";
import ImageUpload from './ImageUpload';
import ImagesContainer from './ImagesContainer';
import './CSS/Home.css'
import { useEffect } from 'react';


const Home = () => {
    const { userName } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0)
      })

    return ( 
        <main>
            {userName && <h1>Welcome, {userName}!</h1>}
            {userName && <ImageUpload /> }
            <ImagesContainer />
        </main>
     );
}
 
export default Home;
