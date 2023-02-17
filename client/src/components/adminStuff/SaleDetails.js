import checkAdmin from "../hoc/checkAdmin";
import {useEffect, useState} from "react";
import axios from "../api/Axios";
import Loading from "../cosmetics/Loading";

const ORDER_URL = "/order"

const AddProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [orders, setOrders] = useState([])

    useEffect(() => {
        setIsLoading(true);
        setErrMsg(null);
        axios.get(ORDER_URL)
            .then(response => {
                setOrders(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setErrMsg(error);
                setIsLoading(false);
            });
    }, []);
    return(
        <div>
            <div className="orders_list_container">
                {errMsg ? (
                    <p>{errMsg}</p>
                ) : (
                    isLoading && orders.length <= 0 ? (
                        <Loading/>
                    ) : (
                        <div className="orders_list">
                            <ul>
                                {orders.map((order, index) => (
                                    <li key={index}>
                                        Order {index + 1}: Value: {order.value}, Payment: {order.payment}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default checkAdmin(AddProduct);