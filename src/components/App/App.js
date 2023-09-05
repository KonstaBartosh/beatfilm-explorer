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
import * as api from "../../utils/MainApi";
import { CurrentUserContext, UserMoviesContext } from "../../context/context";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [userMovies, setUserMovies] = useState([]);

  const validFooterPaths = ["/", "/movies", "/saved-movies"];
  const validHeaderPaths = validFooterPaths + "/profile";
  const shouldShowHeader = validHeaderPaths.includes(location.pathname);
  const shouldShowFooter = validFooterPaths.includes(location.pathname);

  console.log(userMovies)
  
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
        .catch((err) => alert(`Возникла ошибка ${err}`));
    }
  }, []);

  //** данные пользователя из БД если он залогиннен */
  useEffect(() => {
    if (loggedIn) {
      api
        .getUserData()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => alert(`Возникла ошибка ${err}`));
    }
  }, [loggedIn]);


  function handleRegister({ name, email, password }) {
    api
      .register({ name, email, password })
      .then(() => {
        navigate("/sign-in");
      })
      .catch((err) => alert(`Возникла ошибка ${err}`));
  }

  function handleLogin({ email, password }) {
    api
      .login({ email, password })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => alert(`Возникла ошибка ${err}`));
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }

  const movies = loggedIn ? (
    <Movies
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
    />
  ) : (
    <Main />
  );

  const savedMovies = loggedIn ? 
    <SavedMovies/> : <Main />;

  const profile = loggedIn ? <Profile onLogOut={handleLogOut} /> : null;


  return (
    <div className="app">
      <UserMoviesContext.Provider value={{ userMovies, setUserMovies }}>
        <CurrentUserContext.Provider value={currentUser}>
          {shouldShowHeader && <Header loggedIn={loggedIn} />}
          <Routes>
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={movies} />
            <Route path="/saved-movies" element={savedMovies} />
            <Route path="/profile" element={profile} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {shouldShowFooter && <Footer />}
        </CurrentUserContext.Provider>
      </UserMoviesContext.Provider>
    </div>
  );
}

export default App;
