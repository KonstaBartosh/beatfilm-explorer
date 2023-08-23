import React from "react";

import './Movies.css'
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

export default function Movies({ onSearchClick, moviesList }) {
	return(
		<section className="movies">
			<SearchForm onSearchClick={onSearchClick} />
			<MoviesCardList moviesList={moviesList} />
		</section>
	);
}