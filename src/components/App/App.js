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
import * as auth from "../../utils/MainApi";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLogin] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const validFooterPaths = ["/", "/movies", "/saved-movies"];
  const validHeaderPaths = validFooterPaths + "/profile";

  const shouldShowHeader = validHeaderPaths.includes(location.pathname);
  const shouldShowFooter = validFooterPaths.includes(location.pathname);
  
  const movies = loggedIn ? <Movies /> : <Main /> ;
  const savedMovies = loggedIn ? <SavedMovies /> : <Main />;
  const profile = loggedIn ? <Profile /> : <NotFound />

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleRegister({ name, email, password}) {
    auth
      .register({ name, email, password})
      .then(() => {
        navigate('/sign-in');
      })
      .catch((err) => alert(`Возникла ошибка ${err}`))
  }

  function handleLogin({ email, password}) {
    auth
      .login({ email, password})
      .then((data) => {
        localStorage.setItem('token', data.token);
        setLogin(true);
        navigate('/');
      })
      .catch((err) => alert(`Возникла ошибка ${err}`))
  }

  /** Валидность токена */
  function handleTokenCheck() {
    auth
      .checkToken()
      .then((user) => {
        const currentUserName = user.name;
        const currentUserEmail = user.email;
        setLogin(true);
        navigate('/');
        setUserName(currentUserName)
        setUserEmail(currentUserEmail)
      })
      .catch((err) => alert(`Возникла ошибка ${err}`))
  }

  console.log(userName);

  return (
    <div className="app">
      {shouldShowHeader && <Header loggedIn={loggedIn} />}
      <Routes>
        <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
        <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={movies} />
        <Route path="/saved-movies" element={savedMovies} />
        <Route path="/profile" element={profile} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default App;
