import { useState } from "react";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import { Route, Routes } from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

function App() {
  const [loggedIn, setLogin] = useState(true);

  return (
    <body className="app">
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path="/"  element={<Main />}/>
        <Route path="/movies" element={loggedIn ? <Movies /> : <Main />}/>
        <Route path="/saved-movies" element={loggedIn ? <SavedMovies /> : <Main />}/>
        <Route path="/profile" element={loggedIn ? <Profile /> : null}/>
      </Routes>
      {/* <Footer /> */}
    </body>
  );
}

export default App;
