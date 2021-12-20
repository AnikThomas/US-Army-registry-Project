import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AppProvider } from "./components/context";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';




ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AppProvider>
                <App/>
            </AppProvider>
        </BrowserRouter>,
    </React.StrictMode>,
    document.getElementById("root")
)
