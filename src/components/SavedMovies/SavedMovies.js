import React, { useContext, useEffect, useState } from "react";

import "../Movies/Movies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { UserMoviesContext } from "../../context/context";

function SavedMovies({ getUserMovies }) {
  const {userMovies, setUserMovies} = useContext(UserMoviesContext);
  const [query, setQuery] = useState('');
  const [isToggled, setIsToggled] = useState(false);

  //** подгружаем сохраненные фильмы из БД */
  useEffect(() => {
    getUserMovies();
  }, [])

  function handleSearchUserMovies() {
    console.log('sss')
    const filtered = userMovies.filter((movie) => {
      const movieName = movie.nameRU || movie.nameEN;
      return movieName.toLowerCase().includes(query.toLowerCase());
    })
    setUserMovies(filtered);
  }

  const handleOnChange = (evt) => {
    const value = evt.target.value;
    setQuery(value);
  }

  const localStorageMovies = JSON.parse(localStorage.getItem("userMovies"));

  //** переключатель короткометражек */
  function handleToggleSwitch() {
    if (isToggled === false) {
      const shortMoviesList = userMovies.filter((movie) => movie.duration < 40)
      setIsToggled(true);
      setUserMovies(shortMoviesList);;
      localStorage.setItem('userMovies', JSON.stringify(userMovies));
    } else {
      setIsToggled(false);
      setUserMovies(localStorageMovies);
      localStorage.removeItem("userMovies");
    }
  }

  return (
    <section className="movies">  
      <SearchForm
        onSearchClick={handleSearchUserMovies}
        handleSearchChange={handleOnChange}
        onToggle={handleToggleSwitch}
        searchQuery={query}
      />
      <MoviesCardList 
        arrayList={userMovies}
        cards={userMovies}
        userMovies={userMovies}
      />
    </section>
  );
}

export default SavedMovies;