import React from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";

function MoviesCardList ({ list, isLoading, errorMessage, onAddMore, cardsToShow }) {
  return (
    isLoading ? <Preloader /> :
    <>
      <section className="movies-card-list">
        {cardsToShow.length > 0  
        ? (cardsToShow.map((movie) => {
          return <MoviesCard key={movie.id} movie={movie} />
        }))
        : (<p className="movies-card-list__message">Ничего не найдено</p>)}
        {errorMessage}
      </section>

      {list.length > cardsToShow.length && 
      (<button onClick={onAddMore} className="movies-card-list__button">Еще</button>)}
    </>
  )
}

export default MoviesCardList;