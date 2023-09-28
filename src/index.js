import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App/App";
import { MovieProvider } from "./context/MovieContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <MovieProvider>
        <App />
      </MovieProvider>
    </React.StrictMode>
  </BrowserRouter>
);