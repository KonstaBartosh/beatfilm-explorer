import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import "./MoviesCard.css";
import * as api from "../../utils/MainApi";
import { SIGN_IN_MESSAGE, URL_MOVIE_SERVER } from "../../utils/constants";
import { UserMoviesContext } from "../../context/UserMoviesContext";
import { MovieContext } from "../../context/MovieContext";
import { MovieType } from "../../utils/types";
import { formatTime } from "../../utils/helpers";

interface Props {
  movie: MovieType;
  handleError: (arg: string) => void;
}

export const MoviesCard = ({ movie, handleError }: Props) => {
  const { userMovies, setUserMovies } = useContext(UserMoviesContext);
  const { openMoviePopup } = useContext(MovieContext);
  const { nameRU, duration, image } = movie;
  const formattedDuration = useMemo(() => formatTime(duration), [duration]);
  const [isLiked, setIsLiked] = useState(false);

  const { pathname } = useLocation();
  const picture = pathname === "/" ? `${URL_MOVIE_SERVER}${image.url}` : image.url;
  const buttonClassName = `card__btn ${isLiked && "card__btn_active"}`;


  // есть ли фильм в списке лайкнутых => установить начальное состояние isLiked
  useEffect(() => {
    if (localStorage.getItem("isUserLogin")) {
      setIsLiked(
        userMovies.some((userMovie) => userMovie.nameRU === movie.nameRU)
      );
    }
  }, [userMovies, movie.nameRU]);

  function toggleLike() {
    const isMovieSaved = userMovies.find(
      (userMovie) => userMovie.nameRU === movie.nameRU);

    isMovieSaved ? removeMovie(isMovieSaved) : saveMovie();
  }
  
  function saveMovie() {
    api
      .saveUserMovie(movie)
      .then((response) => {
        const savedMovie = response;
        setIsLiked(true);
        setUserMovies([...userMovies, savedMovie]);
      })
      .catch(() => handleError(SIGN_IN_MESSAGE));
  }
  
  function removeMovie(movieToRemove: any) {
    api
      .removeUserMovie(movieToRemove._id)
      .then(() => {
        setIsLiked(false);
        setUserMovies(
          userMovies.filter((userMovie) => userMovie.nameRU !== movieToRemove.nameRU)
        );
      })
      .catch((err) => handleError(err));
  }
  

  function handleMoviePopup() {
    openMoviePopup(movie);
  }

  return (
    <div className="card">
      <img
        src={picture}
        alt={nameRU}
        className="card__image"
        onClick={handleMoviePopup}
      />
      <div className="card__header">
        <div className="card__header-wrapper">
          <h2 className="card__title">{nameRU}</h2>
          <button
            className={buttonClassName}
            type="submit"
            onClick={toggleLike}
          />
        </div>
        <span className="card__subtitle">{formattedDuration}</span>
      </div>
    </div>
  );
}