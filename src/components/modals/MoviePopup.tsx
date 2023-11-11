import React, { useContext } from "react";

import "./popup.css";
import { MovieContext } from "../../context/MovieContext";
import { URL_MOVIE_SERVER } from "../../utils/constants";
import { useLocation } from "react-router-dom";

export const MoviePopup = () => {
  const { selectedMovie, closeMoviePopup } = useContext(MovieContext);
  const { pathname } = useLocation();


  const handleOverlayClick = (evt: React.SyntheticEvent) => {
    if (evt.target === evt.currentTarget) {
      closeMoviePopup();
    }
  }

  return (
    selectedMovie && (
    <section className="popup popup_opened" onClick={togglePopup}>
      <div className="popup__container popup__container_movie overlay">
        <div className="popup__thumbnail-wrap">
          <img 
            className="popup__image-movie"
            alt={selectedMovie.nameRU} 
            src={ pathname === "/"
              ? `${URL_MOVIE_SERVER}${selectedMovie.image.url}`
              : selectedMovie.image.url
            } 
          />
          <div className="popup__header-wrap">
            <div>
              <h2 className="popup__title popup__title_movie">{selectedMovie.nameRU}</h2>
              <p className="popup__subtitle">
                {`${selectedMovie.country}, ${selectedMovie.director}, ${selectedMovie.year}`}
              </p>              
            </div>
            <button className="popup__trailer-button">
              <a
                className="popup__link"
                href={selectedMovie.trailerLink} 
                target="_blank" 
                rel="noreferrer"
              >
                Трейлер
              </a>
            </button>
          </div>
        </div>
        <p className="popup__text">{selectedMovie.description}</p>
        <button
          className="popup__close-button"
          aria-label="Закрыть"
          type="button"
          onClick={closeMoviePopup}
        />
      </div>
    </section>)
  );
}