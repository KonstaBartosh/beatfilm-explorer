import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";

export default function MoviesCardList({ moviesList, isLoading, errorMessage }) {
  if (isLoading) {
    return (<Preloader />)
  }
  return (
    <>
      <section className="movies-card-list">
          {/* {moviesList.length > 0 ? 
          (moviesList.map((movie) => {
            return <MoviesCard key={movie.id} movie={movie} />;
          })) 
          : (<p className="movies-card-list__message">Ничего не найдено</p>)
          } */}
        {errorMessage}
      </section>
      {/* <button className="movies-card-list__button">Еще</button> */}
    </>
  );
}
