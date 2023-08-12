import { useState } from 'react';
import Header from '../Header/Header';
import './App.css';


function App() {
  const [loggedIn, setLogin] = useState(false);

  return (
    <div className="App">
      <Header loggedIn={loggedIn} />
    </div>
  );
}

export default App;
