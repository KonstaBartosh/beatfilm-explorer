import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList() {
  return (
    <>
      <section className="movies-card-list">
        {Array.from({ length: 16 }, (_, index) => (
          <MoviesCard key={index} />
        ))}
      </section>
      <button className="movies-card-list__button">Еще</button>
    </>
  );
}
