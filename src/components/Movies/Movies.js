  import React, { useEffect } from "react";
  import { useState } from "react";
  import * as moviesApi from "../../utils/MoviesApi";

  import "./Movies.css";
  import SearchForm from "./SearchForm/SearchForm";
  import MoviesCardList from "./MoviesCardList/MoviesCardList";
  import { messageErr } from "../../utils/constants";

  export default function Movies() {
    const [moviesList, setMoviesList] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isToggled, setIsToggled] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [displayCards, setDisplayCards] = useState(16);
    const cardsToShow = filteredMovies.slice(0, displayCards);

    const localStorageMovies = JSON.parse(localStorage.getItem('lastSearchRequest'));
    const localStorageQuery = localStorage.getItem('query');
    const slicedLocalStorageQuery = localStorageQuery ? localStorageQuery.slice(1, -1) : '';

    
    function handleLocalStorageData () {
      if (localStorageMovies === null) {
        return;
      }
      setFilteredMovies(localStorageMovies);
      setSearchQuery(localStorageQuery);
    }
    
    //** возвращаем предыдущий запрос если он был */
    useEffect(() => {
      handleLocalStorageData();
    })
    
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
          setErrorMessage(messageErr);
        });
    }, []);

    const updateDisplayCards = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1280) {
        setDisplayCards(16);
      } else if (screenWidth >= 768) {
        setDisplayCards(8);
      } else {
        setDisplayCards(5);
      }
    };

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
      if (searchQuery === "") {
        setValidationMessage("Нужно ввести ключевое слово");
        return;
      }

      //** поиск фильмов на основе запроса */
      setValidationMessage("");
      const filtered = moviesList.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase().slice(1,-1));
      });
      setFilteredMovies(filtered);
      // обновление localStorage при изменении filteredMovies
      localStorage.setItem('lastSearchRequest', JSON.stringify(filtered));
    }

    //** переключатель короткометражек */
    function handleToggleSwitch() {
      if (!isToggled) {
        const shortMovies = filteredMovies.filter((movie) => movie.duration < 60);
        setFilteredMovies(shortMovies);
        setIsToggled(true);
      } else {
        handleSearchSubmit();
        setIsToggled(false);
      }
    }

    //** запись значения в поиске в стейт-переменную */
    const handleSearchChange = (evt) => {
      const value = evt.target.value;
      localStorage.setItem('query', JSON.stringify(value))
      setSearchQuery(localStorage.getItem('query', JSON.stringify(value)));
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
          validationMessage={validationMessage}
          defaultValue={slicedLocalStorageQuery}
        />
        <MoviesCardList
          list={filteredMovies}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onAddMore={handleAddMoreCards}
          cardsToShow={cardsToShow}
        />
      </section>
    );
  }
