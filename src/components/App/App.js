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
import ProtectedRoute from "../ProtectedRoute";
import * as api from "../../utils/MainApi";
import { CurrentUserContext, UserMoviesContext } from "../../context/context";
import PopupWithForm from "../popups/PopupWithForm/PopupWithForm";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [userMovies, setUserMovies] = useState([]);

  const validFooterPaths = ["/", "/movies", "/saved-movies"];
  const validHeaderPaths = validFooterPaths + "/profile";
  const shouldShowHeader = validHeaderPaths.includes(location.pathname);
  const shouldShowFooter = validFooterPaths.includes(location.pathname);

  const handleError = (err) => {
    console.error(`Возникла ошибка ${err.message}`)
  }

  //** проверка валидности токена */
  useEffect(() => {
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
  }, []);

  //** данные пользователя из БД если он залогиннен */
  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserData()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch(handleError);
    }
  }, [isLoggedIn]);

  function handleRegister({ name, email, password }) {
    api
      .register({ name, email, password })
      .then(() => {
        navigate("/sign-in");
      })
      .catch(handleError);
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
      })
      .catch(handleError);
  }

  return (
    <div className="app">
      <UserMoviesContext.Provider value={{ userMovies, setUserMovies }}>
        <CurrentUserContext.Provider value={currentUser}>
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
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn} />
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
          <PopupWithForm/>
        </CurrentUserContext.Provider>
      </UserMoviesContext.Provider>
    </div>
  );
}

export default App;
