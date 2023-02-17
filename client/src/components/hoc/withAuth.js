import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => {
    return (props) => {
        const navigate = useNavigate();
        const loggedIn = localStorage.getItem("sessionData");

        useEffect(() => {
            if (loggedIn) {
                navigate("/");
            }
        }, [navigate, loggedIn]);

        return <Component {...props} />;
    };
};

export default withAuth;
