import { useState } from "react";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import { Route, Routes, useLocation } from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";

function App() {
  const location = useLocation();
  const [loggedIn, setLogin] = useState(true);

  const showFooter =
    location.pathname !== "/profile" &&
    location.pathname !== "/sign-in" &&
    location.pathname !== "/sign-up";

  return (
    <body className="app">
      {/* <Header loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={loggedIn ? <Movies /> : <Main />} />
        <Route
          path="/saved-movies"
          element={loggedIn ? <SavedMovies /> : <Main />}
        />
        <Route path="/profile" element={loggedIn ? <Profile /> : null} />
      </Routes>
      {showFooter ? <Footer /> : null} */}
      <Login/>
    </body>
  );
}

export default App;
