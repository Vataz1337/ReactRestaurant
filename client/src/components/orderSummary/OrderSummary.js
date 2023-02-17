import CartContext from '../cart/CartContext';
import React, {useContext, useEffect, useState} from "react";
import axios from "../api/Axios";

const ORDER_URL = "/order"
const NUMBER_URL = "/number"

const OrderSummary = () => {
    const [value] = useState(localStorage.getItem("orderCost"));
    const [payment, setPayment] = useState("");
    const [number, setNumber] = useState(0);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const {cart, setCart} = useContext(CartContext);

    useEffect(() => {
        setIsLoading(true);
        setErrMsg(null);
        axios.get(NUMBER_URL)
            .then(response => {
                setNumber(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setErrMsg(error);
                setIsLoading(false);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(ORDER_URL, {
                value,
                payment
            });
            setCart([]);
            console.log(response.data);
            console.log(JSON.stringify(response));
            setSuccess(true);
        } catch (error) {
            if (!error?.response) {
                setErrMsg("No Server Response")
            } else {
                setErrMsg("Something went wrong :/")
            }
        }
    }

    return (
        <div>
            {success ? (
                <div>
                    <div>
                        <p>Thank you for ordering at Damn Good</p>
                    </div>
                    <div>
                        {isLoading ? (
                            <div>
                                <p>Just a moment, our system is generating your order</p>
                            </div>
                        ) : (
                            <div>
                                <p>Your order number is: {number.number}</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : value && cart.length > 0 ? (
                <>
                    <div>
                        <div>
                            <p className={errMsg ? "errmsg" : "hide"}>{errMsg}</p>
                        </div>
                        <div>
                            <p>Total to pay: {value}</p>
                        </div>
                        <div>
                            <p>Payment method:</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="balance"
                                    onChange={(e) => setPayment(e.target.value)}
                                />{" "}
                                Balance
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    onChange={(e) => setPayment(e.target.value)}
                                />{" "}
                                Card
                            </div>
                            <button disabled={!payment}>Pay up</button>
                        </form>
                    </div>
                </>
            ) : (
                <div>You didn't order anything yet :/</div>
            )}
        </div>
    );
}

export default OrderSummary;