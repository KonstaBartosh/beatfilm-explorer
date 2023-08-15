import { useState } from "react";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  const [loggedIn, setLogin] = useState(false);

  return (
    <div className="app">
      <Header loggedIn={loggedIn} />
      <Main />  
      <Footer />
    </div>
  );
}

export default App;
