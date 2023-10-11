/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
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
import InfoToolTip from "../popups/InfoTooltip";
import MoviePopup from "../popups/MoviePopup";
import * as api from "../../utils/mainApi";
import { SUCCES_REGISTRATION_MESSAGE } from "../../utils/constants";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { UserMoviesContext } from "../../context/UserMoviesContext";
import { MovieType, UserType } from "../../utils/types";

function App() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(CurrentUserContext);
  const { setUserMovies } = useContext(UserMoviesContext);
  const { pathname } = useLocation();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [succesMessage, setSuccesMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validFooterPaths = ["/", "/saved-movies"];
  const validHeaderPaths = validFooterPaths + "/profile";
  const shouldShowHeader = validHeaderPaths.includes(pathname);
  const shouldShowFooter = validFooterPaths.includes(pathname);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  }, [isLoggedIn]);

  const handleError = (message: string) => {
    setIsInfoPopupOpen(true);
    setErrorMessage(message);
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
      .then((userData: UserType) => {
        setCurrentUser(userData);
      })
      .catch((err) => handleError(err));
  }

  //** получить фильмы из избранного  */
  function getUserMovies() {
    api
      .getUserMovies()
      .then((data: MovieType[]) => {
        setUserMovies(data);
      })
      .catch((err) => handleError(err));
  }

  function handleRegister({ name, email, password }: UserType) {
    api
      .register({ name, email, password })
      .then(() => {
        handleLogin({ email, password });
        setIsRegistered(true);
        openSuccesPopup(SUCCES_REGISTRATION_MESSAGE);
      })
      .catch((err) => handleError(err));
  }

  function handleLogin({ email, password }: UserType) {
    api
      .login({ email, password })
      .then((data: any) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isUserLogin", "true");
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

  function handleChangeProfile({ name, email }: UserType) {
    api
      .changeUserData({ name, email })
      .then((data: UserType) => setCurrentUser(data))
      .catch((err) => handleError(err));
  }

  function openSuccesPopup(message: string) {
    setSuccesMessage(message);
    setIsInfoPopupOpen(true);
    setTimeout(() => {
      setIsInfoPopupOpen(false);
    }, 3000);
  }

  const handleClosePopups = () => {
    setIsInfoPopupOpen(false);
  };

  // const AuthenticatedProfile = ProtectedRoute(Profile);
  // const AuthSavedMovies = ProtectedRoute(SavedMovies);

  return (
    <div className="app">
      {shouldShowHeader && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <Movies getUserMovies={getUserMovies} handleError={handleError} />
          }
        />
        {!isLoggedIn && (
          <>
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          </>
        )}
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SavedMovies getUserMovies={getUserMovies}  />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile onLogOut={handleLogout} onSave={handleChangeProfile} />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {shouldShowFooter && <Footer />}
      <InfoToolTip
        isOpen={isInfoPopupOpen}
        onClose={handleClosePopups}
        condition={isRegistered}
        successTitle={succesMessage}
        deniedTitle={errorMessage}
      />
      <MoviePopup />
    </div>
  );
}

export default App;
