import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const checkAdmin = (Component) => {
    return (props) => {
        const navigate = useNavigate();
        const admin = (localStorage.getItem("sessionData"));

        useEffect(() => {
            if (admin !== "\"Admin\"") {
                navigate("/");
            }
        }, [navigate, admin]);

        return <Component {...props} />;
    };
};

export default checkAdmin;