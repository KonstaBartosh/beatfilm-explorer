import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ moviesList }) {
  return (
    <>
      <section className="movies-card-list">
        {
          moviesList.map((movie) => (
            <MoviesCard 
              key={movie.id}
              movie={movie}
            />
          ))
        }
      </section>
      <button className="movies-card-list__button">Еще</button>
    </>
  );
}
