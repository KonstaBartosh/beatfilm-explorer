import React from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";
import { MOVIES_NOT_FOUND_MESSAGE, MOVIES_SERVER_ERR_MESSAGE } from "../../utils/constants";

function MoviesCardList({
  arrayList,
  isLoading,
  isRequestError,
  onAddMore,
  cards,
  isMoviesNotFound,
}) {
  const location = useLocation();
  const moviesPageLocation = location.pathname === "/movies";
  const handleMoviesNotFound = isMoviesNotFound ? MOVIES_NOT_FOUND_MESSAGE : '';


  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <section className="movies-card-list">
        {cards.length > 0 ? (
          cards.map((movie) => {
            return <MoviesCard key={movie.nameRU} movie={movie} />;
          })
        ) : (
          <p className="movies-card-list__message">
            {isRequestError ? MOVIES_SERVER_ERR_MESSAGE : handleMoviesNotFound}
          </p>
        )
        }
      </section>

      {moviesPageLocation && arrayList.length > cards.length && (
        <button onClick={onAddMore} className="movies-card-list__button">
          Еще
        </button>
      )}
    </>
  );
}

export default MoviesCardList;
