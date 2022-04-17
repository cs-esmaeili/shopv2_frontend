import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from "./views/layouts/Main";

render(
    <Provider store={store} >
        <BrowserRouter>
            <ToastContainer />
            <Main />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

