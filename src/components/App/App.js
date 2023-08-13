import { useState } from 'react';
import Header from '../Header/Header';
import './App.css';
import BurgerMenu from '../Header/BurgerMenu/BurgerMenu';


function App() {
  const [loggedIn, setLogin] = useState(true);

  return (
    <div className="App">
      <Header loggedIn={loggedIn} />
    </div>
  );
}

export default App;
