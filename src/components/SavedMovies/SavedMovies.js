import React from "react";

import '../pages/Movies/Movies.css'

import SearchForm from "../pages/Movies/SearchForm/SearchForm";
import MoviesCardList from "../pages/Movies/MoviesCardList/MoviesCardList";

export default function SavedMovies() {
	return(
		<section className="movies">
			<SearchForm />
			<MoviesCardList sampleItems={4}/>
		</section>
	);
}