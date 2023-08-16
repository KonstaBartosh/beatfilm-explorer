import { useState } from "react";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";

function App() {
  const [loggedIn, setLogin] = useState(true);

  return (
    <div className="app">
      <Header loggedIn={loggedIn} />
      {!loggedIn ? <Main /> : null }
      <Movies />
      <Footer />
    </div>
  );
}

export default App;
