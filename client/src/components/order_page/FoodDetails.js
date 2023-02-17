import useFetchFood from './FetchFood';
import {useParams} from "react-router";
import Loading from "../cosmetics/Loading"
import React from "react";
import "./FoodDetails.css"
import FoodItem from "./FoodItem";

const FoodDetails = () => {
    const { foodItems, isLoading } = useFetchFood();
    const { id } = useParams();

    const foodItem = foodItems.find(item => item.id === id);

    return (
        <div className="food_details_container">
            {isLoading && foodItems.length <= 0 ? (
                <Loading/>
            ) : foodItem ? (
                <FoodItem foodItem={foodItem} />
            ) : (
                <div>No food item found with id {id}</div>
            )}
        </div>
    );
};

export default FoodDetails;