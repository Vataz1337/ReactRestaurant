import React, { useState } from 'react';

const FoodDetails = (props) => {
    const [foodItem, setFoodItem] = useState(props.location.state.foodItem);

    const handleSave = () => {
    }

    return (
        <div className="edit-food">
            <form>
                <input type="text" value={foodItem.name} onChange={(e) => setFoodItem({ ...foodItem, name: e.target.value })} />
                <input type="text" value={foodItem.price} onChange={(e) => setFoodItem({ ...foodItem, price: e.target.value })} />
                <textarea value={foodItem.description} onChange={(e) => setFoodItem({ ...foodItem, description: e.target.value })} />
                <button onClick={handleSave}>Save</button>
            </form>
        </div>
    );
}

export default FoodDetails;