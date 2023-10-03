import React, { useState, useEffect } from "react";

import "./Movies.css";
import * as moviesApi from "../../utils/MoviesApi";
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
import { ADD_MORE_CARDS, AMMOUNT_OF_CARDS, CARDS_AMMOUNT, SCREEN_WIDTH, SHORT_MOVIE_LENGTH } from "../../utils/constants";
import { filterMovies } from "../../utils/filterMovies";

function Movies({ getUserMovies, handleError }) {
  //** чтение значений из localStorage */
  const storageAllMovies = getFromLocalStorage("allMovies" || []);
  const storageMovies = getFromLocalStorage("searchList");
  const storageShortMovies = getFromLocalStorage("shortMovies");
  const storageQuery = getFromLocalStorage("query");
  const storageIsToggled = getFromLocalStorage("isToggled");
  
  const [moviesList, setMoviesList] = useState(storageAllMovies || []);
  const [filteredMovies, setFilteredMovies] = useState(storageAllMovies || []);
  const [searchQuery, setSearchQuery] = useState(storageQuery || '');
  const [isToggled, setIsToggled] = useState(false);
  const [isRequestError, setRequestError] = useState(false);
  const [isMoviesNotFound, setIsMoviesNotFound] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [displayCards, setDisplayCards] = useState(AMMOUNT_OF_CARDS);
  const cardsToShow = filteredMovies.slice(0, displayCards);

  function getFromLocalStorage(key, value = null) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : value;
  }

  function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  //** подгружаем БД всех фильмов  */
  useEffect(() => {
    if (moviesList.length === 0) {
      setLoading(true);
      
      moviesApi
        .getMovies()
        .then((data) => {
          setMoviesList(data);
          setFilteredMovies(data);
          setLocalStorage("allMovies", data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setRequestError(true);
          handleError();
      });
    }
  }, []);

  //** подгружаем БД избранных фильмов для отображения лайков */
  useEffect(() => {
    const isUserLogin = getFromLocalStorage("isUserLogin");
    
    if (isUserLogin) {
      getUserMovies();
    }
  }, []);

  //** обновляем состояние isToggled из localStorage  */
  //** и возвращаем предыдущий поисковый запрос если он был */
  useEffect(() => {
    setToggleState();
    handleLocalStorageData();
  }, [storageIsToggled]);

  //** изменение кол-ва карточек в зависимости от ширины экрана */
  useEffect(() => {
    updateDisplayCards();

    window.addEventListener("resize", () => {
      updateDisplayCards();
    });

    return () => {
      window.removeEventListener("resize", updateDisplayCards);
    };
  }, [filteredMovies]);
  
  function setToggleState() {
    if (storageIsToggled) {
      setIsToggled(true);
    } else {
      setIsToggled(false);
    }
  }

  function handleLocalStorageData() {
    if (storageMovies === null) {
      return;
    }

    storageShortMovies 
    ? setFilteredMovies(storageShortMovies)
    : setFilteredMovies(storageMovies);
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
  function handleSearchMovies() {
    const filtered = filterMovies(moviesList, isToggled, searchQuery);

    if (filtered.length === 0) {
      setIsMoviesNotFound(true)
    }

    setFilteredMovies(filtered);
    setLocalStorage("searchList", filtered);
  }

  //** переключатель короткометражек */
  function handleToggleSwitch() {
    if (isToggled === false) {
      const shortFilms = filteredMovies.filter((movie) => movie.duration < SHORT_MOVIE_LENGTH);
      setIsToggled(true);
      setLocalStorage("isToggled", true);
      setLocalStorage("shortMovies", shortFilms);
      setFilteredMovies(shortFilms)
    } else {
      setIsToggled(false);
      setFilteredMovies(storageMovies || storageAllMovies);
      localStorage.removeItem('isToggled');
      localStorage.removeItem("shortMovies");
    }
  }

  //** запись значения в поиске в стейт-переменную */
  const handleSearchChange = (evt) => {
    const value = evt.target.value;
    setSearchQuery(value);
    setLocalStorage("query", value);
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
          onSearchClick={handleSearchMovies}
          handleSearchChange={handleSearchChange}
          onToggle={handleToggleSwitch}
          defaultValue={storageQuery}
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
          handleError={handleError}
        />
    </section>
  );
}

export default Movies;
