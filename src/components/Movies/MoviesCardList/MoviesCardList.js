import React from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";
import { useLocation } from "react-router-dom";

function MoviesCardList ({ arrayList, isLoading, isRequestError, errorMessage, onAddMore, cards}) {
  const location = useLocation();
  const moviesPageLocation = location.pathname === '/movies';
  const notFoundMessage = 'Ничего не найдено';
  const requestErrorMessage = `Во время запроса произошла ошибка. Возможно, 
  проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`;
  const message = isRequestError ? requestErrorMessage : notFoundMessage;

  
  return (
    isLoading ? <Preloader /> :
    <>
      <section className="movies-card-list">
        {cards.length > 0 ? (cards.map((movie) => {
          return <MoviesCard key={movie.nameRU} movie={movie} />
        }))
        : (<p className="movies-card-list__message">{message}</p>)}
        {/* {errorMessage} */}
      </section>

      {moviesPageLocation && arrayList.length > cards.length && 
      (<button onClick={onAddMore} className="movies-card-list__button">Еще</button>)}
    </>
  )
}

export default MoviesCardList;