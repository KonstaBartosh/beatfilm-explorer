import { useState } from "react";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import Promo from "../Main/Promo/Promo";
import NavTab from "../Main/NavTab/NavTab";

function App() {
  const [loggedIn, setLogin] = useState(false);

  return (
    <div className="App">
      <Header loggedIn={loggedIn} />
      <Main />
    </div>
  );
}

export default App;
