import React from "react";
import { createContext, useState, ReactNode } from "react";
import { MovieType } from "../utils/types";

interface UserMoviesType {
  userMovies: MovieType[];
  setUserMovies: (movies: MovieType[]) => void;
}

interface UserMoviesProviderProps {
  children: ReactNode;
}

const defaultUserMoviesContext: UserMoviesType = {
  userMovies: [],
  setUserMovies: () => {},
};

export const UserMoviesContext = createContext<UserMoviesType>(defaultUserMoviesContext);

export const UserMoviesProvider: React.FC<UserMoviesProviderProps> = ({
  children,
}) => {
  const [userMovies, setUserMovies] = useState<MovieType[]>([]);

  return (
    <UserMoviesContext.Provider value={{ userMovies, setUserMovies }}>
      {children}
    </UserMoviesContext.Provider>
  );
};