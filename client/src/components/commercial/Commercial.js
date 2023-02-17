import React, { useState, useEffect } from 'react';
import axios from '../api/Axios';
import loading from '../../saved/loading.gif'
import './Commercial.css'

const COMMERCIAL_URL = '/commercial'

const Commercial = () => {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        axios.get(COMMERCIAL_URL)
            .then(response => {
                setImages(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError(error);
                setIsLoading(false);
            });
    }, []);

    const changeImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }
    useEffect(() => {
        const intervalId = setInterval(changeImage, 5000);
        return () => clearInterval(intervalId);
    }, [currentImageIndex, images.length]);

    return (
        <div className="commercial-banner">
            {isLoading && <div><img src={loading} alt="loading" className="commercialImage"/></div>}
            {error && <div>{error.message}</div>}
            {images.length > 0 && <img src={images[currentImageIndex].url} alt={images[currentImageIndex].name} className="commercialImage"/>}
        </div>
    );
}

export default Commercial;