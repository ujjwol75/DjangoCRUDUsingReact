import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import {CookiesProvider} from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
  <BrowserRouter>
    <Routes>
      
      {/* <React.StrictMode> */}
        <Route path="/articles" element={<App />} />
        <Route path="/" element={<Login />} />
        
      {/* </React.StrictMode> */}
    </Routes>
  </BrowserRouter>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
