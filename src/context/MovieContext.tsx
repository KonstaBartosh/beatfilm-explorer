import React, { createContext, useState } from 'react';
import { ChildrenType, MovieType } from '../utils/types';

interface MovieContextType {
  selectedMovie: null | MovieType;
  openMoviePopup: (movie: MovieType) => void;
  closeMoviePopup: () => void;
}

const defaultMovieContext: MovieContextType = {
  selectedMovie: null,
  openMoviePopup: () => {},
  closeMoviePopup: () => {},
};

export const MovieContext = createContext<MovieContextType>(defaultMovieContext);

export const MovieProvider = ({ children }: ChildrenType) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  const openMoviePopup = (movie: MovieType) => {
    setSelectedMovie(movie);
  };

  const closeMoviePopup = () => {
    setSelectedMovie(null);
  };

  return (
    <MovieContext.Provider value={{ selectedMovie, openMoviePopup, closeMoviePopup }}>
      {children}
    </MovieContext.Provider>
  );
};
