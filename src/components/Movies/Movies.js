import React, { useEffect } from "react";
import { useState } from "react";
import * as moviesApi from "../../utils/MoviesApi"

import './Movies.css'
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

export default function Movies() {
  const [moviesList, setMoviesList] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  //** подгрузка фильмов при монтировании компонента */
	useEffect(() => {
		moviesApi
			.getMovies()
			.then((data) => setMoviesList(data))
			.catch((err) => alert(`Возникла ошибка ${err}`))
	}, [])

  /** отправка формы */
	function handleSearchSubmit (evt) {
    evt.preventDefault();
    //** фильтрация фильмов на основе поискового запроса */
    const filtered = moviesList.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    });

    setFilteredMovies(filtered);
  };

  //** запись значения в поиске в стейт-переменную */
	const handleSearchChange = (evt) => {
    setSearchQuery(evt.target.value);
  };

  function handleToggleSwitchOn () {
    if (isToggled === false) {
      setIsToggled(true);
      const shortMovies = moviesList.filter(movie => movie.duration < 60);
      setFilteredMovies(shortMovies);
      console.log(isToggled);
    } else if (isToggled === true) {
      setIsToggled(false);
      setFilteredMovies(moviesList);
    }
  };


  return (
    <section className="movies">
      <SearchForm
        onSearchClick={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
				setFilteredMovies={setFilteredMovies}
        onToggle={handleToggleSwitchOn}
      />
      <MoviesCardList moviesList={filteredMovies} />
    </section>
  );
}