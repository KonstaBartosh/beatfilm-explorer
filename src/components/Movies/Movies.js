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
  const [validationMessage, setValidationMessage] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const message = (<p className="movies-card-list__message">
    Во время запроса произошла ошибка. 
    Возможно, проблема с соединением или сервер недоступен. 
    Подождите немного и попробуйте ещё раз</p>)


  //** подгрузка фильмов при монтировании компонента */
	useEffect(() => {
		moviesApi
			.getMovies()
			.then((data) => {
        setLoading(false);
        setMoviesList(data);
      })
			.catch(() => {
        setLoading(false);
        setErrorMessage(message);
      })
	}, []);

  /** отправка формы */
	function handleSearchSubmit (evt) {
    evt.preventDefault();

    if (searchQuery === '') {
      setValidationMessage('Нужно ввести ключевое слово');
      return;
    }

    //** фильтрация фильмов на основе поискового запроса */
    setValidationMessage('');
    const filtered = moviesList.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    });
    setFilteredMovies(filtered);
  };

  //** запись значения в поиске в стейт-переменную */
	const handleSearchChange = (evt) => {
    setSearchQuery(evt.target.value);
  };

  //** переключатель короткометражек */
  function handleToggleSwitch () {
    if (!isToggled) {
      setIsToggled(true);
      const shortMovies = moviesList.filter(movie => movie.duration < 60);
      setFilteredMovies(shortMovies);
    } else {
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
        onToggle={handleToggleSwitch}
        validationMessage={validationMessage}
      />
      <MoviesCardList 
        moviesList={filteredMovies}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </section>
  );
}