import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App/App";
import { CurrentUserProvider } from "./context/CurrentUserContext";
import { UserMoviesProvider } from "./context/UserMoviesContext";
import { MovieProvider } from "./context/MovieContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
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