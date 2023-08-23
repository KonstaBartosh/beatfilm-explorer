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

	useEffect(() => {
		moviesApi
			.getMovies()
			.then((data) => setMoviesList(data))
			.catch((err) => alert(`Возникла ошибка ${err}`))
	}, [])

	function handleSearchSubmit (evt) {
    evt.preventDefault();

    const filtered = moviesList.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredMovies(filtered);
  };

	const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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