import Commercial from "../commercial/Commercial";
import './Home.css'
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const Home = () =>{
    const navigate = useNavigate();

    const [place, setPlace] = useState(localStorage.getItem("orderPlace") || null);

    const handlePlaceChange = (e) => {
        const newPlace = e.target.value;
        setPlace(newPlace);
        localStorage.setItem("orderPlace", newPlace);
        navigate("/Order");
    };

    return(
        <>
            <div className="home_container">
                <div>
                    <Commercial/>
                </div>
                <div className="home_buttons">
                    <div className="home_button">
                        <button onClick={handlePlaceChange} value="inside">Order on site</button>
                    </div>
                    <div className="home_button">
                        <button onClick={handlePlaceChange} value="to go">Order to go</button>
                    </div>
                </div>
            </div>
            {/*{place ? (*/}
            {/*    <p>You orderd {place}</p>*/}
            {/*) : (*/}
            {/*    <p>Choose where you want to eat</p>*/}
            {/*)}*/}
        </>
    )
}

export default Home;