import React, { useContext, useEffect, useState } from "react";

import "./SavedMovies.css";
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList.js";
import { UserMoviesContext } from "../../context/context.js";
import { SHORT_MOVIE_LENGTH } from "../../utils/constants";
import { filterMovies } from "../../utils/filterMovies";

function SavedMovies({ getUserMovies }) {
  const {userMovies, setUserMovies} = useContext(UserMoviesContext);
  const [filteredUserMovies, setFilteredUserMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const [isMoviesNotFound, setIsMoviesNotFound] = useState(false);

  //** подгружаем сохраненные фильмы из БД */
  useEffect(() => {
    getUserMovies();
  }, []);

  useEffect(() => {
    setFilteredUserMovies(userMovies);
  }, [userMovies])

  function handleSearchUserMovies() {
    const filtered = filterMovies(userMovies, isToggled, query)

    if (filtered.length === 0) {
      setIsMoviesNotFound(true)
    }

    setFilteredUserMovies(filtered);
  }

  const handleOnChange = (evt) => {
    const value = evt.target.value;
    setQuery(value);
  }

  //** переключатель короткометражек */
  function handleToggleSwitch() {
    if (isToggled === false) {
      const shortMoviesList = userMovies.filter((movie) => movie.duration < SHORT_MOVIE_LENGTH)
      setIsToggled(true);
      setUserMovies(shortMoviesList);;
      localStorage.setItem('userMovies', JSON.stringify(userMovies));
    } else {
      setIsToggled(false);
      setUserMovies(JSON.parse(localStorage.getItem("userMovies")));
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