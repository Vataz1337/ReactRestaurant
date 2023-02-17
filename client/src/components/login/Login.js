import {useRef, useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from "../api/Axios";
import './Login.css';
import withAuth from "../hoc/withAuth";

const LOGIN_URL = 'users/login'

const Login = () => {
    const userRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(LOGIN_URL,{
                user,
                pwd
            });
            console.log(response.data);
            console.log(JSON.stringify(response));
            localStorage.setItem("sessionData", JSON.stringify(response.data));
            setSuccess(true);
        }catch (error){
            if(!error?.response){
                setErrMsg("No Server Response")
            } else if(error.response?.status === 401){
                setErrMsg("Invalid username or password")
            } else{
                setErrMsg("Something went wrong :/")
            }
        }
    }

    return(
        <>
            {success ? (
                <div className="logged_in_main_container">
                    <div className="logged_in_second">
                        <Container>
                            <Row>
                                <Col>
                                    <h1>You are logged in!</h1>
                                    <span className="Link">
                                        <Link to="/Order">Make Your Order</Link>
                                    </span>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            ) : (
                <Container>
                    <Row>
                        <Col>
                            <h1>Sign In</h1>
                            {errMsg && <Alert variant="danger">{errMsg}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        required
                                        autoComplete="off"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Sign In
                                </Button>
                            </Form>
                            <div>
                                <div>
                                    <p>
                                        Need an Account?<br/>
                                    </p>
                                    <span className="Link">
                                    <Link to="/Register">Sign Up</Link>
                                </span>
                                </div>
                                <div>
                                    <span className="Link">
                                        <Link to="/Order">Checkout Menu</Link>
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default withAuth(Login);