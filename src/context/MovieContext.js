import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

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
