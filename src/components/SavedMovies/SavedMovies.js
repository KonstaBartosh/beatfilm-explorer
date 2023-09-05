import React, { useContext, useEffect, useState } from "react";

import "../Movies/Movies.css";
import * as api from "../../utils/MainApi";

import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { UserMoviesContext } from "../../context/context";

export default function SavedMovies() {
  const {userMovies, setUserMovies} = useContext(UserMoviesContext);
  const [query, setQuery] = useState('');

  //** подгружаем сохраненные фильмы из БД */
  useEffect(() => {
    api
      .getUserMovies()
      .then((data) => {
        setUserMovies(data);
      })
      .catch((err) => alert(`Возникла ошибка ${err}`));
  }, []);

  function handleSearchUserMovies() {
    const filtered = userMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(query.toLowerCase());
    })
    setUserMovies(filtered);
  }

  const handleOnChange = (evt) => {
    const value = evt.target.value;
    setQuery(value);
  }

  return (
    <section className="movies">  
      <SearchForm
        onSearchClick={handleSearchUserMovies}
        handleSearchChange={handleOnChange}
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
