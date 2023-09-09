import React, { useContext, useEffect, useState } from "react";

import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm.js";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList.js";
import { UserMoviesContext } from "../../context/context.js";

function SavedMovies({ getUserMovies }) {
  const {userMovies, setUserMovies} = useContext(UserMoviesContext);
  const [filteredUserMovies, setFilteredUserMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const [isMoviesNotFound, setIsMoviesNotFound] = useState(false);

  console.log(filteredUserMovies)

  //** подгружаем сохраненные фильмы из БД */
  useEffect(() => {
    getUserMovies();
  }, [])

  useEffect(() => {
    setFilteredUserMovies(userMovies);
  }, [userMovies])

  function handleSearchUserMovies() {
    const filtered = userMovies.filter((movie) => {
      const movieName = movie.nameRU || movie.nameEN;
      return movieName.toLowerCase().includes(query.toLowerCase());
    });

    if (filtered.length === 0) {
      setIsMoviesNotFound(true)
    }

    setFilteredUserMovies(filtered);
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
    <section className="saved-movies">  
      <SearchForm
        onSearchClick={handleSearchUserMovies}
        handleSearchChange={handleOnChange}
        onToggle={handleToggleSwitch}
        searchQuery={query}
      />
      <MoviesCardList 
        arrayList={userMovies}
        cards={filteredUserMovies}
        userMovies={userMovies}
        isMoviesNotFound={isMoviesNotFound}
      />
    </section>
  );
}

export default SavedMovies;