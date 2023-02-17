import { useState, useEffect } from 'react';
import axios from "../api/Axios";

const FOOD_URL = "/food";

const useFetchFood = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        axios.get(FOOD_URL)
            .then(response => {
                setFoodItems(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError(error);
                setIsLoading(false);
            });
    }, []);

    return { foodItems, error, isLoading };
};

export default useFetchFood;