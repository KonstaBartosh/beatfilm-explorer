import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./MoviesCard.css";
import * as api from "../../../utils/MainApi";
import { movieServerUrl } from "../../../utils/constants";
import { UserMoviesContext } from "../../../context/context";

function MoviesCard({ movie }) {
  const location = useLocation();
  const { userMovies, setUserMovies } = useContext(UserMoviesContext);
  const [isLiked, setIsLiked] = useState(false);
  const { nameRU, duration, image, trailerLink } = movie;
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

  function handleSaveMovie() {
    api
      .saveUserMovie(movie)
      .then(() => {
        setIsLiked(true);
        //** oбновляем userMovies после сохранения фильма */
        setUserMovies([...userMovies, movie]);
      })
      .catch((err) => console.log(`Возникла ошибка ${err}`));
  }

  function toggleLike() {
    // Проверяем, есть ли фильм с таким же id в userMovies
    const isMovieSaved = userMovies.some((userMovie) => userMovie.nameRU === movie.nameRU);

    if (!isMovieSaved) {
      handleSaveMovie();
    } else {
      // Если фильм уже сохранен, используем его id для удаления
      // Находим фильм в userMovies по id
      const savedMovie = 
        userMovies.find((userMovie) => userMovie.nameRU === movie.nameRU);
      // Если находим фильм в userMovies, удаляем его по _id
      if (savedMovie) {
        api
          .removeUserMovie(savedMovie._id)
          .then(() => {
            setUserMovies(userMovies.filter((userMovie) => userMovie._id !== savedMovie._id));
            setIsLiked(false);
          })
          .catch((err) => console.log(`Возникла ошибка ${err}`));
      }
    }
  };

  //-----------------------------------------------------------------
  // works well, dont' touch!
  function handelRemoveMovie() {
    api
      .removeUserMovie(movie._id)
      .then(() => {
        setIsLiked(false);
        setUserMovies(
          userMovies.filter((userMovie) => userMovie._id !== movie._id)
        );
      })
      .catch((err) => console.log(`Возникла ошибка ${err}`));
  }
  //-----------------------------------------------------------------

  const button =
    location.pathname === "/movies" ? (
      <button
        className={cardLikeButtonClassName}
        type="submit"
        onClick={toggleLike}
      />
    ) : (
      <button
        className="card__btn card__like_rm"
        type="submit"
        onClick={handelRemoveMovie}
      >
        &#x2717;
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
        <span className="card__subtitle">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default MoviesCard;
