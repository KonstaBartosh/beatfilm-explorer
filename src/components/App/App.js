/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../../pages/Movies/Movies";
import SavedMovies from "../../pages/SavedMovies/SavedMovies";
import Profile from "../../pages/Profile/Profile";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import NotFound from "../../pages/NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as api from "../../utils/MainApi.js";
import { CurrentUserContext, UserMoviesContext } from "../../context/context";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { SUCCES_REGISTRATION_MESSAGE } from "../../utils/constants";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [succesMessage, setSuccesMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userMovies, setUserMovies] = useState([]);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const validFooterPaths = ["/", "/saved-movies"];
  const validHeaderPaths = validFooterPaths + "/profile";
  const shouldShowHeader = validHeaderPaths.includes(location.pathname);
  const shouldShowFooter = validFooterPaths.includes(location.pathname);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  }, [isLoggedIn]);

  const handleError = (message) => {
    setErrorMessage(message);
    setIsInfoPopupOpen(true);
  };

  //** проверка валидности токена */
  function handleTokenCheck() {
    const token = localStorage.getItem("token");

    if (token) {
      api
        .checkToken()
        .then(() => {
          setLoggedIn(true);
        })
        .catch((err) => handleError(err));
    }
  }

  //** данные пользователя из БД */
  function getUserData() {
    api
      .getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => handleError(err));
  }

  //** получить фильмы из избранного  */
  function getUserMovies() {
    api
      .getUserMovies()
      .then((data) => {
        setUserMovies(data);
      })
      .catch((err) => handleError(err));
  }

  function handleRegister({ name, email, password }) {
    api
      .register({ name, email, password })
      .then(() => {
        handleLogin({ email, password });
        setIsRegistered(true);
        openSuccesPopup(SUCCES_REGISTRATION_MESSAGE);
      })
      .catch((err) => handleError(err));
  }

  function handleLogin({ email, password }) {
    api
      .login({ email, password })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isUserLogin", true);
        navigate("/");
        setLoggedIn(true);
      })
      .catch((err) => handleError(err));
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }

  function handleChangeProfile({ name, email }) {
    api
      .changeUserData({ name, email })
      .then((data) => setCurrentUser(data))
      .catch((err) => handleError(err));
  }

  function openSuccesPopup(message) {
    setSuccesMessage(message);
    setIsInfoPopupOpen(true);
    setTimeout(() => {
      setIsInfoPopupOpen(false);
    }, 3000);
  }

  const handleClosePopup = () => {
    setIsInfoPopupOpen(false);
  };

  return (
    <div className="app">
      <UserMoviesContext.Provider value={{ userMovies, setUserMovies }}>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          {shouldShowHeader && <Header />}
          <Routes>
            <Route
              path="/"
              element={
                <Movies
                  isLoggedIn={isLoggedIn}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  getUserMovies={getUserMovies}
                  handleError={handleError}
                />
            }
            />
            {!isLoggedIn && (
              <>
                <Route
                  path="/sign-up"
                  element={
                    <Register onRegister={handleRegister} isRegistered={isRegistered} />
                  }
                />
                <Route
                  path="/sign-in"
                  element={<Login onLogin={handleLogin} />}
                />
              </>
            )}
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  isLoggedIn={isLoggedIn}
                  getUserMovies={getUserMovies}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  isLoggedIn={isLoggedIn}
                  onLogOut={handleLogout}
                  onSave={handleChangeProfile}
                />
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          {shouldShowFooter && <Footer />}
        </CurrentUserContext.Provider>
      </UserMoviesContext.Provider>
      <InfoTooltip
        isOpen={isInfoPopupOpen}
        onClose={handleClosePopup}
        condition={isRegistered}
        successTitle={succesMessage}
        deniedTitle={errorMessage}
      />
    </div>
  );
}

export default App;
