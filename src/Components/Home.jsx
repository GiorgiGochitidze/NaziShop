import React from "react";
import { useParams } from "react-router-dom";
import ImageUpload from './ImageUpload';
import ImagesContainer from './ImagesContainer';
import './CSS/Home.css'

const Home = () => {
    const { userName } = useParams();

    return ( 
        <main>
            {userName && <h1>Welcome, {userName}!</h1>}
            {userName && <ImageUpload /> }
            <ImagesContainer />
        </main>
     );
}
 
export default Home;
