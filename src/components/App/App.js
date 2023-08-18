import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";

function App() {
  const url = useLocation();
  const [loggedIn, setLogin] = useState(false);

  const showFooter =
    url.pathname !== "/profile" &&
    url.pathname !== "/sign-in" &&
    url.pathname !== "/sign-up";

  const showHeader = url.pathname !== "/sign-in" && url.pathname !== "/sign-up";

  return (
    <body className="app">
      {showHeader && <Header loggedIn={loggedIn}/>}
      <Routes>
        <Route path="/sign-up" element={<Register/>} />
        <Route path="/sign-in" element={<Login/>} />
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={loggedIn ? <Movies /> : <Main />} />
        <Route path="/saved-movies"
          element={loggedIn ? <SavedMovies /> : <Main />}
        />
        <Route path="/profile" element={loggedIn ? <Profile /> : null} />
      </Routes>
      {showFooter && <Footer />}
    </body>
  );
}

export default App;
