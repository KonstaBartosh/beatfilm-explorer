import { useState } from "react";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import { Route, Routes } from "react-router-dom";

function App() {
  const [loggedIn, setLogin] = useState(true);

  return (
    <body className="app">
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path="/"  element={<Main />}/>
        <Route path="/movies" element={loggedIn ? <Movies /> : <Main/>}/>
      </Routes>
      <Footer />
    </body>
  );
}

export default App;
