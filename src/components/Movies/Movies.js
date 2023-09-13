import React, { useEffect } from "react";
import { useState } from "react";

import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm.js";
import MoviesCardList from "./MoviesCardList/MoviesCardList.js";
import { ADD_MORE_CARDS, CARDS_AMMOUNT, SCREEN_WIDTH, SHORT_MOVIE_LENGTH } from "../../utils/constants";

export default function Movies({ isRequestError, isLoading, moviesList, getMovies, getUserMovies }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(('searchQuery') || '');
  const [isToggled, setIsToggled] = useState(false);
  const [displayCards, setDisplayCards] = useState(16);
  const [isMoviesNotFound, setIsMoviesNotFound] = useState(false);
  const cardsToShow = filteredMovies.slice(0, displayCards);
  const localStorageMovies = JSON.parse(localStorage.getItem("moviesList"));
  const localStorageShortMovies = JSON.parse(localStorage.getItem("shortMovies"));
  const localStorageQuery = localStorage.getItem("query");
  const localStorageIsToggled = localStorage.getItem("isToggled");

  //** подгружаем БД всех фильмов  */
  useEffect(() => {
    if (moviesList.length === 0) {
      getMovies();
    }
  }, []);

  //** подгружаем БД избранных фильмов для отображения лайков */
  useEffect(() => {
    getUserMovies();
  }, []);

  //** обновляем состояние isToggled из localStorage  */
  //** и возвращаем предыдущий поисковый запрос если он был */
  useEffect(() => {
    setToggleState();
    handleLocalStorageData();
  }, [localStorageIsToggled]);

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
  }, [filteredMovies]);
  
  function setToggleState() {
    if (localStorageIsToggled) {
      setIsToggled(true);
    } else {
      setIsToggled(false);
    }
  }

  function handleLocalStorageData() {
    if (localStorageMovies === null) {
      return;
    }

    localStorageShortMovies 
    ? setFilteredMovies(localStorageShortMovies)
    : setFilteredMovies(localStorageMovies);
  }

  /** обновляет количество отображаемых карточек в зависимости от ширины экрана */
  function updateDisplayCards() {
    const screenWidth = window.innerWidth;
    let number;

    if (screenWidth >= SCREEN_WIDTH.LARGE) {
      number = CARDS_AMMOUNT.LARGE;
    } else if (screenWidth < SCREEN_WIDTH.LARGE && screenWidth > SCREEN_WIDTH.TABLET) {
      number = CARDS_AMMOUNT.MEDIUM;
    } else if (screenWidth < SCREEN_WIDTH.TABLET && screenWidth >= SCREEN_WIDTH.TABLET_SMALL) {
      number = CARDS_AMMOUNT.SMALL;
    } else {
      number = CARDS_AMMOUNT.X_SMALL;
    }

    setDisplayCards(number);
  }

  /** отправка формы поиска */
  function handleSearchSubmit() {
    
    const filtered = moviesList.filter((movie) => {
      const movieName = movie.nameRU || movie.nameEN;

      return movieName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (filtered.length === 0) {
      setIsMoviesNotFound(true)
    }
    
    setFilteredMovies(filtered);
    // обновление localStorage при изменении filteredMovies
    localStorage.setItem("moviesList", JSON.stringify(filtered));
  }

  //** фильтрации короткометражных фильмов */
  function filterShortMovies() {
    return filteredMovies.filter((movie) => movie.duration < SHORT_MOVIE_LENGTH);
  }
  
  //** переключатель короткометражек */
  function handleToggleSwitch() {
    if (isToggled === false) {
      const shortMoviesList = filterShortMovies();
      setIsToggled(true);
      localStorage.setItem('isToggled', true);
      localStorage.setItem('shortMovies', JSON.stringify(shortMoviesList));
    } else {
      setIsToggled(false);
      setFilteredMovies(localStorageMovies);
      localStorage.removeItem('isToggled');
      localStorage.removeItem("shortMovies");
    }
  }

  //** запись значения в поиске в стейт-переменную */
  const handleSearchChange = (evt) => {
    const value = evt.target.value;
    setSearchQuery(value);
    // localStorage.setItem("query", JSON.stringify(value));
    localStorage.setItem("query", value);
  };

  //** добавление карточек из списка */
  const handleAddMoreCards = () => {
    const windowWidth = window.innerWidth;
    let number;
  
    if (windowWidth >= SCREEN_WIDTH.LARGE) {
      number = ADD_MORE_CARDS.FOUR;
    } else if (windowWidth < SCREEN_WIDTH.LARGE && windowWidth > 989) {
      number = ADD_MORE_CARDS.THREE;;
    } else {
      number = ADD_MORE_CARDS.TWO;
    }
  
    const numberOfCards = displayCards + number;
    setDisplayCards(numberOfCards);
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
          searchQuery={searchQuery}
        />
        <MoviesCardList
          arrayList={filteredMovies}
          isLoading={isLoading}
          isRequestError={isRequestError}
          onAddMore={handleAddMoreCards}
          cards={cardsToShow}
          isMoviesNotFound={isMoviesNotFound}
        />
    </section>
  );
}
