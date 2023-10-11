import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import "./MoviesCard.css";
import * as api from "../../utils/mainApi";
import { SIGN_IN_MESSAGE, URL_MOVIE_SERVER } from "../../utils/constants";
import { UserMoviesContext } from "../../context/UserMoviesContext";
import { MovieContext } from "../../context/MovieContext";
import { MovieType } from "../../utils/types";
import { formatTime } from "../../utils/helpers";

interface Props {
  movie: MovieType;
  handleError: (arg: string) => void;
}

function MoviesCard({ movie, handleError }: Props) {
  const { userMovies, setUserMovies } = useContext(UserMoviesContext);
  const { openMoviePopup } = useContext(MovieContext);
  const { nameRU, duration, image } = movie;
  const formattedDuration = useMemo(() => formatTime(duration), [duration]);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const { pathname } = useLocation();
  const isMoviesPath: boolean = pathname === "/";
  const picture: string =
    pathname === "/" ? `${URL_MOVIE_SERVER}${image.url}` : image.url;

  //** стили для кнопки */
  const buttonText: string | null = isMoviesPath ? null : "✗";
  const baseButtonClassName: string = "card__btn";
  const likeButtonClassName: string = `card__like ${
    isLiked && "card__like_active"
  }`;
  const removeButtonClassName: string = "card__like_rm";

  const buttonClassName: string = isMoviesPath
    ? ` ${baseButtonClassName} ${likeButtonClassName}`
    : `${baseButtonClassName} ${removeButtonClassName}`;

  // есть ли фильм в списке лайкнутых => установить начальное состояние isLiked
  useEffect(() => {
    if (localStorage.getItem("isUserLogin")) {
      setIsLiked(
        userMovies.some((userMovie) => userMovie.nameRU === movie.nameRU)
      );
    }
  }, [userMovies, movie.nameRU]);

  function toggleLike() {
    //** ищем фильм в userMovies */
    const savedMovie = userMovies.find(
      (userMovie) => userMovie.nameRU === movie.nameRU
    );
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
      .catch(() => handleError(SIGN_IN_MESSAGE));
  }

  function handleRemoveMovie(movieToRemove: any) {
    api
      .removeUserMovie(movieToRemove._id)
      .then(() => {
        setIsLiked(false);
        setUserMovies(
          userMovies.filter((userMovie) => userMovie._id !== movieToRemove._id)
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
          >
            {buttonText}
          </button>
        </div>
        <span className="card__subtitle">{formattedDuration}</span>
      </div>
    </div>
  );
}

export default MoviesCard;
