/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import "./Movies.css";
import * as moviesApi from "../../utils/moviesApi";
import SearchForm from "../../components/UI/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
import { filterMovies } from "../../utils/filterMovies";
import { LocalStorageDataType, MovieType } from "../../utils/types";
import { getFromLocalStorage, setLocalStorage } from "../../utils/helpers";
import { 
  ADD_MORE_CARDS, 
  AMMOUNT_OF_CARDS, 
  CARDS_AMMOUNT, 
  SCREEN_WIDTH, 
  SHORT_MOVIE_LENGTH 
} from "../../utils/constants";

interface MoviesProps {
  getUserMovies: () => void;
  handleError: (arg: string) => void;
}

function Movies({ getUserMovies, handleError }: MoviesProps) {
  const LOCAL_STORAGE: LocalStorageDataType = {
    IS_USER_LOGGED: getFromLocalStorage("isUserLogin"),
    ALL_MOVIES: getFromLocalStorage("allMovies"),
    SHORT_MOVIES: getFromLocalStorage("shortMovies"),
    SEARCH_LIST: getFromLocalStorage("searchList"),
    SEARCH_QUERY: getFromLocalStorage("searchQuery"),
    IS_TOGGLED: getFromLocalStorage("isToggled"),
  }

  const [moviesList, setMoviesList] = useState<MovieType[]>(LOCAL_STORAGE.ALL_MOVIES || []);
  const [filteredMovies, setFilteredMovies] = useState<MovieType[]>(LOCAL_STORAGE.ALL_MOVIES || []);
  const [searchQuery, setSearchQuery] = useState(LOCAL_STORAGE.SEARCH_QUERY || '');
  const [isToggled, setIsToggled] = useState(false);
  const [isRequestError, setRequestError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [displayCards, setDisplayCards] = useState(AMMOUNT_OF_CARDS);
  const cardsToShow = filteredMovies.slice(0, displayCards);

  //** подгружаем БД всех фильмов  */
  useEffect(() => {
    if (moviesList.length === 0) {
      setLoading(true);
      
      moviesApi
        .getMovies()
        .then((data: MovieType[]) => {
          setMoviesList(data);
          setFilteredMovies(data);
          setLocalStorage("allMovies", data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setRequestError(true);
      });
    }
  }, []);

  //** подгружаем БД избранных фильмов для отображения лайков */
  useEffect(() => {
    if (LOCAL_STORAGE.IS_USER_LOGGED) {
      getUserMovies();
    }
  }, []);

  //** обновляем состояние isToggled из localStorage  */
  //** и возвращаем предыдущий поисковый запрос если он был */
  useEffect(() => {
    setToggleState(); 
    handleLocalStorageData();
  }, [LOCAL_STORAGE.IS_TOGGLED]);

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
    if (LOCAL_STORAGE.IS_TOGGLED) {
      setIsToggled(true);
    } else {
      setIsToggled(false);
    }
  }

  function handleLocalStorageData() {
    if (LOCAL_STORAGE.SEARCH_LIST === null) {
      return;
    }

    LOCAL_STORAGE.SHORT_MOVIES 
    ? setFilteredMovies(LOCAL_STORAGE.SHORT_MOVIES)
    : setFilteredMovies(LOCAL_STORAGE.SEARCH_LIST);
  }

  /** отправка формы поиска */
  function handleSearchMovies() {
    const filtered = filterMovies(moviesList, isToggled, searchQuery);

    setFilteredMovies(filtered);
    setLocalStorage("searchList", filtered);
  }

  //** переключатель короткометражек */
  function handleToggleSwitch() {
    if (isToggled === false) {
      const shortMovies = filteredMovies.filter((movie) => movie.duration < SHORT_MOVIE_LENGTH);
      setIsToggled(true);
      setLocalStorage("isToggled", true);
      setLocalStorage("shortMovies", shortMovies);
      setFilteredMovies(shortMovies)
    } else {
      setIsToggled(false);
      setFilteredMovies(LOCAL_STORAGE.SEARCH_LIST || LOCAL_STORAGE.ALL_MOVIES);
      localStorage.removeItem('isToggled');
      localStorage.removeItem("shortMovies");
    }
  }

  //** запись значения в поиске в стейт-переменную */
  const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setSearchQuery(value);
    setLocalStorage("searchQuery", value);
  };

    /** обновляет количество отображаемых карточек в зависимости от ширины экрана */
  function updateDisplayCards() {
    const screenWidth: number = window.innerWidth;
    let number: number;

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

  //** добавление карточек из списка */
  const handleAddMoreCards = () => {
    const windowWidth: number = window.innerWidth;
    let number: number;
  
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
          defaultValue={LOCAL_STORAGE.SEARCH_QUERY}
          isToggled={isToggled}
          searchQuery={searchQuery}
        />
        <MoviesCardList
          arrayList={filteredMovies}
          isLoading={isLoading}
          isRequestError={isRequestError}
          cards={cardsToShow}
          onAddMore={handleAddMoreCards}
          handleError={handleError}
        />
    </section>
  );
}

export default Movies;
