import { SHORT_MOVIE_LENGTH } from "./constants";
import { MovieType } from "./types";

  /** Функция фильтрации списка фильмов */
export function filterMovies(
  moviesList: MovieType[], 
  isShort: boolean, 
  searchQuery: string
  ) {
  return moviesList.filter((movie) => {
    const movieName = movie.nameRU || movie.nameEN;
    return isShort
      ? movieName.toLowerCase().includes(searchQuery.toLowerCase()) && movie.duration < SHORT_MOVIE_LENGTH
      : movieName.toLowerCase().includes(searchQuery.toLowerCase())
  });
}