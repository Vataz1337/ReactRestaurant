import {Routes, Route} from "react-router-dom";
import {useState} from 'react';
import Login from "./components/login/Login";
import NavBar from "./components/navigation_bar/NavBar";
import Home from "./components/home/Home";
import NotFound from "./components/not_found/PageNotFound";
import Register from "./components/register/Register";
import MainOrder from "./components/order_page/MainOrder";
import Cart from "./components/cart/Cart";
import FoodDetails from "./components/order_page/FoodDetails";
import OrderSummary from "./components/orderSummary/OrderSummary";
import CartContext from "./components/cart/CartContext";
import AddProduct from "./components/adminStuff/AddProduct";
import EditProduct from "./components/adminStuff/EditProduct";
import SaleDetails from "./components/adminStuff/SaleDetails";

import './App.css';

function App() {
    const [cart, setCart] = useState([]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            <div className="App">
                <Routes>
                    <Route path={"/"} element={<NavBar/>}>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path='/cart' element={<Cart/>}/>
                        <Route path={"/order"} element={<MainOrder/>}/>
                        <Route path={"/summary"} element={<OrderSummary/>}/>
                        <Route path={"/addProduct"} element={<AddProduct/>}/>
                        <Route path={"/editProduct"} element={<EditProduct/>}/>
                        <Route path={"/saleDetails"} element={<SaleDetails/>}/>
                        <Route exact path="/foodDetails/:id" element={<FoodDetails/>}/>
                    </Route>
                    <Route path={"login"} element={<Login/>}/>
                    <Route path={"register"} element={<Register/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                </Routes>
            </div>
        </CartContext.Provider>
    );
}

export default App;