import { React, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import "./MoviesCard.css";
import * as api from "../../../utils/MainApi";
import { movieServerUrl } from "../../../utils/constants";
import { UserMoviesContext } from "../../../context/context";

function MoviesCard({ movie }) {
  const location = useLocation();
  const { userMovies, setUserMovies } = useContext(UserMoviesContext);
  const { nameRU, duration, image, trailerLink } = movie;
  const formattedDuration = useMemo(() => formatTime(duration), [duration]);
  const [isLiked, setIsLiked] = useState(false);
  
  const picture = location.pathname === "/movies"
      ? `${movieServerUrl}${image.url}`
      : image.url;
  
  const cardLikeButtonClassName = `card__btn card__like ${isLiked && "card__like_active"}`;

  // есть ли фильм в списке лайкнутых => установить начальное состояние isLiked
  useEffect(() => {
    setIsLiked(
      userMovies.some((userMovie) => userMovie.nameRU === movie.nameRU)
    );
  }, [userMovies, movie.nameRU]);

  function formatTime(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours ? `${hours}ч` : ""} ${minutes}м`;
  }

  function toggleLike() {
    //** ищем фильм в userMovies */
    const savedMovie = userMovies.find((userMovie) => userMovie._id === movie._id);
  
    if (!savedMovie) {
      handleSaveMovie();
    } else {
      handleRemoveMovie(savedMovie);
    }
  }
  
  function handleSaveMovie() {
    api
      .saveUserMovie(movie)
      .then(() => {
        setIsLiked(true);
        //** добавляем фильм в userMovies после сохранения */
        setUserMovies([...userMovies, movie]);
      })
      .catch((err) => console.error(`Возникла ошибка ${err.message}`));
  }
  
  function handleRemoveMovie(movieToRemove) {
    api
      .removeUserMovie(movieToRemove._id)
      .then(() => {
        setIsLiked(false);
        setUserMovies(userMovies.filter((userMovie) => userMovie._id !== movieToRemove._id));
      })
      .catch((err) => console.error(`Возникла ошибка ${err.message}`));
  }
  

  const button = (
    <button
      className={`card__btn ${location.pathname === "/movies" ? cardLikeButtonClassName : "card__like_rm"}`}
      type="submit"
      onClick={toggleLike}
    >
      {location.pathname === "/movies" ? "" : "✗"}
    </button>
  );
  

  return (
    <div className="card">
      <a href={trailerLink}>
        <img src={picture} alt={nameRU} className="card__image" />
      </a>

      <div className="card__header">
        <div className="card__header-wrapper">
          <h2 className="card__title">{nameRU}</h2>
          {button}
        </div>
        <span className="card__subtitle">{formattedDuration}</span>
      </div>
    </div>
  );
}

export default MoviesCard;