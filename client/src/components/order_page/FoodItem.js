import React, {useContext, useState} from 'react';
import CartContext from '../cart/CartContext';
import './FoodItem.css';
import {Link, useNavigate} from "react-router-dom";

const FoodItem = (props) => {
    const value = localStorage.getItem("sessionData");
    const { foodItem } = props;
    const { cart, setCart } = useContext(CartContext);
    const [count, setCount] = useState(1);

    const navigate = useNavigate();

    const handleAddToCart = () => {
        const existingItem = cart.find(item => item.id === foodItem.id);
        if(existingItem) {
            existingItem.count += count;
            setCart([...cart]);
        } else {
            setCart([...cart, {...foodItem, count: count}]);
        }
    }

    const handleDetailsClick = () => {
        navigate(`/foodDetails/${foodItem.id}`);
    };

    const handleGoBack = () => {
        navigate(`/order`);
    };

    const handleIncrementCount = () => {
        setCount(count + 1);
    }

    const handleDecrementCount = () => {
        if(count > 0) setCount(count - 1);
    }

    const handleAddIngredient = (ingredient, index) => {

    };

    const handleDeleteIngredient = (index) => {

    }

    return (
        <div className="food-item">
            <div className="food-item-left">
                <div>{foodItem.category}</div>
                <div>{foodItem.name}</div>
                <div>{foodItem.cost}</div>
                <div>
                    <p>Ingredients:</p>
                    <ul>
                        {foodItem.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient}
                                <button onClick={() => handleAddIngredient(ingredient, index)}>Add</button>
                                <button onClick={() => handleDeleteIngredient(index)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="food-item-right">
                <img src={foodItem.image} alt={foodItem.id}/>
            </div>
            <>
                {value ? (
                    <div className="button-container">
                        <div className="buttons">
                            <div>
                                <button onClick={handleIncrementCount}>+</button>
                            </div>
                            <div>
                                {count}
                            </div>
                            <div>
                                <button onClick={handleDecrementCount}>-</button>
                            </div>
                            <div>
                                <button onClick={handleAddToCart}>Add to cart</button>
                            </div>
                            <div className="details">
                                <button onClick={handleDetailsClick}>Details</button>
                            </div>
                            <div className="return_button">
                                <button onClick={handleGoBack}>Go Back To Menu</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p>You Need To be Logged To Order</p>
                    </div>
                )}
            </>
        </div>
    );
}

export default FoodItem;