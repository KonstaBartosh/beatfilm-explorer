/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import "./App.css";
import * as components from "../../components";
import * as pages from "../../pages";
import * as api from "../../utils/MainApi";

import { SUCCES_REGISTRATION_MESSAGE } from "../../utils/constants";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { UserMoviesContext } from "../../context/UserMoviesContext";
import { MovieType, UserType } from "../../utils/types";

export const App = () => {
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
        setLoggedIn(true);
        navigate("/");
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

  return (
    <div className="app">
      {shouldShowHeader && <components.Header />}
      <Routes>
        <Route
          path="/"
          element={
            <pages.Movies getUserMovies={getUserMovies} handleError={handleError} />
          }
        />
        {!isLoggedIn && (
          <>
            <Route
              path="/sign-up"
              element={<pages.Register onRegister={handleRegister} />}
            />
            <Route path="/sign-in" element={<pages.Login onLogin={handleLogin} />} />
          </>
        )}
        <Route
          path="/saved-movies"
          element={
            <components.ProtectedRoute>
              <pages.SavedMovies getUserMovies={getUserMovies}  />
            </components.ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <components.ProtectedRoute>
              <pages.Profile onLogOut={handleLogout} onSave={handleChangeProfile} />
            </components.ProtectedRoute>
          }
        />
        <Route path="/*" element={<pages.NotFound />} />
      </Routes>
      {shouldShowFooter && <components.Footer />}
      <components.InfoTooltip
        isOpen={isInfoPopupOpen}
        onClose={handleClosePopups}
        condition={isRegistered}
        successTitle={succesMessage}
        deniedTitle={errorMessage}
      />
      <components.MoviePopup />
    </div>
  );
}
