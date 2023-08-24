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

  return (
    <section className="movies">
      <SearchForm
        onSearchClick={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
				setFilteredMovies={setFilteredMovies}
      />
      <MoviesCardList moviesList={filteredMovies} />
    </section>
  );
}