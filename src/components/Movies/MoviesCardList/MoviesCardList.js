import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";

export default function MoviesCardList({
  list,
  isLoading,
  errorMessage,
  onAddMore,
  cardsToShow,
}) {

  if (isLoading) {
    return <Preloader />;
  }
  return (
    <>
      <section className="movies-card-list">
        {cardsToShow.length > 0  
        ?  (cardsToShow.map((movie) => <MoviesCard key={movie.id} movie={movie} />))
        : (<p className="movies-card-list__message">Ничего не найдено</p>)}
        {errorMessage}
      </section>

      {list.length > cardsToShow.length  
      ? (<button onClick={onAddMore} className="movies-card-list__button">
          Еще
        </button>)
      : null}
    </>
  );
}
