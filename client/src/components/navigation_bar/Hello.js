import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import CartContext from "../cart/CartContext";


const Hello = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState(localStorage.getItem("sessionData"));

    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {
        setValue(localStorage.getItem("sessionData"));
    }, [value]);

    const handleLogout = () => {
        localStorage.removeItem("sessionData");
        localStorage.removeItem("orderPlace");
        setValue(null);
        setCart([]);
        navigate("/");
    };

    const parsedValue = value ? JSON.parse(value) : null;

    return(
        <>
            {value ? (
                <div className="logged_in">
                    <p>Hello {parsedValue}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="not_logged_in">
                    <p>You are not logged in</p>
                    <span className="Link">
                        <Link to="/Login">Login Here</Link>
                    </span>
                </div>
            )}
        </>
    );
}

export default Hello;