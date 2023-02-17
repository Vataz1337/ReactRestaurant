import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import {createRoot} from "react-dom/client";

createRoot(document.getElementById("root")).render(
    <Router>
        <App />
    </Router>
);


