import React, { useContext, useEffect, useState } from "react";

import "./SavedMovies.css";
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
import { SHORT_MOVIE_LENGTH } from "../../utils/constants";
import { filterMovies } from "../../utils/filterMovies";
import { UserMoviesContext } from "../../context/UserMoviesContext";
import { MovieType } from "../../utils/types";

function SavedMovies({ getUserMovies }) {
  const {userMovies, setUserMovies} = useContext(UserMoviesContext);
  const [filteredUserMovies, setFilteredUserMovies] = useState<MovieType[]>([]);
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
        searchQuery={query} defaultValue={undefined} isToggled={undefined}/>
      <MoviesCardList 
        arrayList={userMovies}
        cards={filteredUserMovies}
        isMoviesNotFound={isMoviesNotFound} 
        isLoading={undefined} 
        isRequestError={undefined} 
        onAddMore={undefined} 
        handleError={undefined}      
      />
    </section>
  );
}

export default SavedMovies;