import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App/App";
import { MovieProvider } from "./context/MovieContext";
import { CurrentUserProvider } from "./context/CurrentUserContext";
import { UserMoviesProvider } from "./context/UserMoviesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <CurrentUserProvider>
        <UserMoviesProvider>
          <MovieProvider>
            <App />
          </MovieProvider>
        </UserMoviesProvider>
      </CurrentUserProvider>
    </React.StrictMode>
  </BrowserRouter>
);