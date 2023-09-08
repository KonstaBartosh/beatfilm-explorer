import React, { useEffect } from "react";
import { useState } from "react";

import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

export default function Movies({ isRequestError, isLoading, moviesList }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const [displayCards, setDisplayCards] = useState(16);
  const fiteredToShowMovies = filteredMovies.slice(0, displayCards);
  const localStorageMovies = JSON.parse(localStorage.getItem("moviesList"));
  const localStorageShortMovies = JSON.parse(localStorage.getItem("shortMovies"));
  const localStorageQuery = localStorage.getItem("query");
  const formattedQuery = localStorageQuery ? localStorageQuery.slice(1, -1) : '';
  const localStorageIsToggled = localStorage.getItem("isToggled");

  //** обновляем состояние isToggled из localStorage  */
  //** и возвращаем предыдущий поисковый запрос если он был */
  useEffect(() => {
    setToggleState();
    handleLocalStorageData();
  }, [localStorageIsToggled]);


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

    setSearchQuery(formattedQuery);
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

  /** отправка формы поиска */
  function handleSearchSubmit() {
    const filtered = moviesList.filter((movie) => {
      const movieName = movie.nameRU || movie.nameEN;
      return movieName.toLowerCase().includes(searchQuery.toLowerCase().slice(1, -1));
    });
    
    setFilteredMovies(filtered);
    // обновление localStorage при изменении filteredMovies
    localStorage.setItem("moviesList", JSON.stringify(filtered));
  }

  //** фильтрации короткометражных фильмов */
  function filterShortMovies() {
    return filteredMovies.filter((movie) => movie.duration < 40);
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
          defaultValue={formattedQuery}
          isToggled={isToggled}
          searchQuery={searchQuery}
        />
        <MoviesCardList
          arrayList={filteredMovies}
          isLoading={isLoading}
          isRequestError={isRequestError}
          onAddMore={handleAddMoreCards}
          cards={fiteredToShowMovies}
        />
    </section>
  );
}
