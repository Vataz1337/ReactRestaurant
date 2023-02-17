import React, {useContext, useState} from 'react';
import CartContext from './CartContext';
import {Link, useNavigate} from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();

    const { cart, setCart } = useContext(CartContext);

    const totalCost = cart.reduce((acc, item) => acc + item.cost * item.count, 0);

    const [value] = useState(localStorage.getItem("orderPlace"));

    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
    }

    function handleOrder({total}){
        localStorage.setItem("orderCost", total);
        console.log((localStorage.getItem("orderCost")));
        navigate("/summary")
    }

    return (
        <div className="cart">
            {value ? (
                cart.length > 0 ? (
                    <>
                        <ul>
                            {cart.map(item => (
                                <li key={item.id}>
                                    {item.name} - ${item.cost} x {item.count}
                                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        <div>Total: ${totalCost}</div>
                        <div>
                            <button onClick={() => handleOrder({total: totalCost})}>Order up</button>
                        </div>
                    </>
                ) : (
                    <div>Your cart is empty</div>
                )
            ) : (
                    <p>Please choose where do you want to eat your meal</p>
            )}
            <div>
                <div>
                    <span className="Link">
                        <Link to="/Order">Back to menu</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Cart;