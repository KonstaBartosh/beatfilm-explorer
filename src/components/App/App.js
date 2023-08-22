import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../pages/Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../pages/Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../pages/NotFound/NotFound";

function App() {
  const location = useLocation();
  const [loggedIn, setLogin] = useState(true);

  const validFooterPaths = ["/", "/movies", "/saved-movies"];
  const validHeaderPaths = validFooterPaths + "/profile";

  const shouldShowHeader = validHeaderPaths.includes(location.pathname);
  const shouldShowFooter = validFooterPaths.includes(location.pathname);
  
  const movies = loggedIn ? <Movies /> : <Main /> ;
  const savedMovies = loggedIn ? <SavedMovies /> : <Main />;
  const profile = loggedIn ? <Profile /> : <NotFound />

  return (
    <div className="app">
      {shouldShowHeader && <Header loggedIn={loggedIn} />}
      <Routes>
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
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
