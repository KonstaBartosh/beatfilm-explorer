import React, { useContext, useState } from "react";

import "../Movies/Movies.css";

import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { UserMoviesContext } from "../../context/context";

export default function SavedMovies({ errorMessage }) {
  const [query, setQuery] = useState('');
  const {userMovies, setUserMovies} = useContext(UserMoviesContext);
  

  function handleSearchUserMovies() {
    const filtered = userMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(query.toLowerCase());
    })
    setUserMovies(filtered);
  }

  const qwerty = (evt) => {
    const value = evt.target.value;
    setQuery(value);
  }

  return (
    <section className="movies">  
      <SearchForm
        onSearchClick={handleSearchUserMovies}
        handleSearchChange={qwerty}
        searchQuery={query}
      />
      <MoviesCardList 
        arrayList={userMovies}
        cards={userMovies}
        errorMessage={errorMessage}
        userMovies={userMovies}
      />
    </section>
  );
}
