import React, { useContext } from 'react';
import CartContext from './CartContext';
import {Link} from "react-router-dom";

const Cart = () => {
    const { cart } = useContext(CartContext);

    return (
        <div className="cart">
            <h2>Cart</h2>
            {cart.length > 0 ? (
                <>
                    <div>
                        <span className="Link">
                            <Link to="/Cart">Go to cart</Link>
                        </span>
                    </div>
                </>
            ) : (
                <div>Your cart is empty</div>
            )}
        </div>
    )
}

export default Cart;