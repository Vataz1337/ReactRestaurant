import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Outlet} from "react-router";
import { Navbar, Nav } from 'react-bootstrap';
import CartSmall from "../cart/CartSmall"
import Hello from "./Hello";


const NavBar = () => {
    const [value] = useState(localStorage.getItem("sessionData"));
    console.log(value)
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Damn Good</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/order">Menu</Nav.Link>
                        {value === "\"Admin\"" && <Nav.Link as={Link} to="/addProduct">Add Product</Nav.Link>}
                        {value === "\"Admin\"" && <Nav.Link as={Link} to="/editProduct">Edit Product</Nav.Link>}
                        {value === "\"Admin\"" && <Nav.Link as={Link} to="/saleDetails">Sale Details</Nav.Link>}
                    </Nav>
                    <div>
                        <div className="hello">
                            <Hello/>
                        </div>
                    </div>
                    <CartSmall/>
                </Navbar.Collapse>
            </Navbar>
            <Outlet/>
        </>
    );
}

export default NavBar;