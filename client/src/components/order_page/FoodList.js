import FoodItem from './FoodItem';
import Loading from "../cosmetics/Loading";
import './FoodList.css';
import useFetchFood from './FetchFood';

const FoodList = () => {
    const { foodItems, isLoading } = useFetchFood();

    return (
        <>
            <div className="food_list_container">
                {isLoading && foodItems.length <= 0 ? (
                    <Loading/>
                ) : (
                    <div className="food-items-container">
                        {foodItems.map(foodItem => (
                            <FoodItem key={foodItem.id} foodItem={foodItem}/>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default FoodList;