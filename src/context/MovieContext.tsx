import React, { ReactNode, createContext, useState } from 'react';
import { MovieType } from '../utils/types';

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

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
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
