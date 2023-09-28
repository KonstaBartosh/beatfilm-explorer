import React, { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openMoviePopup = (movie) => {
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
