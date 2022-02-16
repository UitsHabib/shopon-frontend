import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import "font-awesome/css/font-awesome.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/js/src/dropdown"
import "@fortawesome/fontawesome-free/css/all.css";
import "./style/style.css";
import 'react-toastify/dist/ReactToastify.css';

import App from './modules/core/app.component';


ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);