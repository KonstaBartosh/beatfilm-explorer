import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({sampleItems}) {
  return (
    <>
      <section className="movies-card-list">
        {Array.from({ length: sampleItems }, (_, index) => (
          <MoviesCard key={index} />
        ))}
      </section>
      <button className="movies-card-list__button">Еще</button>
    </>
  );
}
