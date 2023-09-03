import React, { useContext, useEffect } from "react";
import { useState } from "react";

import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { UserMoviesContext } from "../../context/context";
import * as moviesApi from "../../utils/MoviesApi";
import { messageErr } from "../../utils/constants";

export default function Movies({ 
  errorMessage,
  setErrorMessage
}) {
  const [moviesList, setMoviesList] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const [isRequestError, setRequestError] = useState(false);
  const [displayCards, setDisplayCards] = useState(16);
  const fiteredToShowMovies = filteredMovies.slice(0, displayCards);
  const [isLoading, setLoading] = useState(true);

  //** взаимодействие с localStorage */
  const localStorageMovies = JSON.parse(localStorage.getItem("moviesList"));
  const localStorageShortMovies = JSON.parse(localStorage.getItem("shortMovies"));
  const localStorageQuery = localStorage.getItem("query");
  // const  = localStorageQuery ? localStorageQuery.slice(1, -1) : "";
  const storedIsToggled = localStorage.getItem("isToggled");

  const [validationError, setValidationError] = useState(false);

  console.log(moviesList);

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
        setRequestError(true);
        // setErrorMessage(messageErr);
      });
  }, []);

  //** возвращаем предыдущий запрос если он был */
  useEffect(() => {
    handleLocalStorageData();
  }, []);

  function handleLocalStorageData() {
    if (localStorageMovies === null) {
      return;
    }

    const shouldRestoreShortMovies = localStorageShortMovies && storedIsToggled;

    if (shouldRestoreShortMovies) {
      setFilteredMovies(localStorageShortMovies);
      setIsToggled(true);
    } else {
      setFilteredMovies(localStorageMovies);
    }

    setSearchQuery(localStorageQuery);
  }

  function updateDisplayCards() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1280) {
      setDisplayCards(16);
    } else if (screenWidth >= 768) {
      setDisplayCards(8);
    } else {
      setDisplayCards(5);
    }
  }

  //** изменение кол-ва карточек в зависимости от ширины экрана */
  useEffect(() => {
    updateDisplayCards();
    //** динамическое изменение кол-ва карточек */
    window.addEventListener("resize", () => {
      updateDisplayCards();
    });

    return () => {
      window.removeEventListener("resize", updateDisplayCards);
    };
  }, []);


  /** отправка формы */
  function handleSearchSubmit() {
    //** поиск фильмов на основе запроса */
    const filtered = moviesList.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase().slice(1, -1));
    });
    setFilteredMovies(filtered);
    // обновление localStorage при изменении filteredMovies
    localStorage.setItem("moviesList", JSON.stringify(filtered));
  }

  //** переключатель короткометражек */
  function handleToggleSwitch() {
    if (isToggled === false) {
      const shortMovies = filteredMovies.filter((movie) => movie.duration < 40);
      setIsToggled(true);
      setFilteredMovies(shortMovies);
      localStorage.setItem("shortMovies", JSON.stringify(shortMovies));
      localStorage.setItem("isToggled", JSON.stringify(true));
    } else {
      handleSearchSubmit();
      setIsToggled(false);
      localStorage.removeItem("shortMovies");
      localStorage.removeItem("isToggled");
    }
  }

  //** запись значения в поиске в стейт-переменную */
  const handleSearchChange = (evt) => {
    const value = evt.target.value;
    localStorage.setItem("query", JSON.stringify(value));
    setSearchQuery(localStorage.getItem("query", JSON.stringify(value)));
  };

  //** добавление карточек из списка */
  const handleAddMoreCards = () => {
    setDisplayCards(
      window.innerWidth > 768 ? displayCards + 4 : displayCards + 2
    );
  };

  return (
    <section className="movies">
      <SearchForm
        onSearchClick={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
        setFilteredMovies={setFilteredMovies}
        onToggle={handleToggleSwitch}
        defaultValue={localStorageQuery}
        isToggled={isToggled}
        validationError={validationError}
      />
      <MoviesCardList
        arrayList={filteredMovies}
        isLoading={isLoading}
        isRequestError={isRequestError}
        errorMessage={errorMessage}
        onAddMore={handleAddMoreCards}
        cards={fiteredToShowMovies}
      />
    </section>
  );
}
