import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as api from "../../utils/mainApi.js";
import * as moviesApi from "../../utils/moviesApi";
import { CurrentUserContext, UserMoviesContext } from "../../context/context";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [userMovies, setUserMovies] = useState([]);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isProfileChangePopupOpen, setIProfileChangePopupOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isUserDataChanged, setUserDataChanged] = useState(false);

  const [moviesList, setMoviesList] = useState([]);
  const [isRequestError, setRequestError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const validFooterPaths = ["/", "/movies", "/saved-movies"];
  const validHeaderPaths = validFooterPaths + "/profile";
  const shouldShowHeader = validHeaderPaths.includes(location.pathname);
  const shouldShowFooter = validFooterPaths.includes(location.pathname);

  const handleError = (err) => console.error(err);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  }, [isLoggedIn]); 
  
  //** проверка валидности токена */
  function handleTokenCheck() {
    const token = localStorage.getItem("token");

    if (token) {
      api
        .checkToken()
        .then(() => {
          setLoggedIn(true);
          navigate("/");
        })
        .catch(handleError);
    }
  }

  //** данные пользователя из БД */
  function getUserData() {
    api
      .getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(handleError);
  }

  //** получить фильмы из отдельной БД  */
  function getMovies() {
    moviesApi
      .getMovies()
      .then((data) => {
        setLoading(false);
        setMoviesList(data);
      })
      .catch(() => {
        setLoading(false);
        setRequestError(true);
    });
  }

  //** получить фильмы из избранного  */
  function getUserMovies() {
    api
      .getUserMovies()
      .then((data) => {
        setUserMovies(data);
      })
      .catch(handleError);
  }

  function handleRegister({ name, email, password }) {
    api
      .register({ name, email, password })
      .then(() => {
        setIsRegistered(true);
        setIsInfoPopupOpen(true);
        navigate("/movies");
        setTimeout(() => {
          setIsInfoPopupOpen(false);
        }, 2000);
      })
      .catch((err) => {
        setIsInfoPopupOpen(true);
        handleError(err);
      });
  }

  function handleLogin({ email, password }) {
    api
      .login({ email, password })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch(handleError);
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }

  function handleChangeUserData({ name, email }) {
    api
      .changeUserData({ name, email })
      .then((data) => {
        setCurrentUser(data);
        setUserDataChanged(true);
        setIProfileChangePopupOpen(true);
        setTimeout(() => {
          setIProfileChangePopupOpen(false);
        }, 2000);
      })
      .catch((err) => {
        setIProfileChangePopupOpen(true);
        handleError(err);
      });
  }

  function handleClosePopup() {
    setIsInfoPopupOpen(false);
    setIProfileChangePopupOpen(false);
  }

  return (
    <div className="app">
      <UserMoviesContext.Provider value={{ userMovies, setUserMovies }}>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          {shouldShowHeader && <Header isLoggedIn={isLoggedIn} />}
          <Routes>
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  isLoggedIn={isLoggedIn}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  isRequestError={isRequestError}
                  isLoading={isLoading}
                  moviesList={moviesList}
                  getMovies={getMovies}
                  getUserMovies={getUserMovies}
                />
              }
            />
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
                  onLogOut={handleLogOut}
                  onSave={handleChangeUserData}
                />
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          {shouldShowFooter && <Footer />}
        </CurrentUserContext.Provider>
      </UserMoviesContext.Provider>
      <InfoTooltip
        isOpen={isProfileChangePopupOpen}
        onClose={handleClosePopup}
        condition={isUserDataChanged}
        successTitle={'Профиль успешно изменен!'}
        deniedTitle={'При обновлении профиля произошла ошибка.'}
      />
      <InfoTooltip
        isOpen={isInfoPopupOpen}
        onClose={handleClosePopup}
        condition={isRegistered}
        successTitle={'Вы успешно зарегистрировались!'}
        deniedTitle={'Что-то пошло не так! Попробуйте ещё раз.'}
      />
    </div>
  );
}

export default App;
