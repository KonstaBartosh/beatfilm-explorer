import { createContext, useState } from "react";
import { ChildrenType, MovieType } from "../utils/types";

interface UserMoviesType {
  userMovies: MovieType[];
  setUserMovies: (movies: MovieType[]) => void;
}

const defaultUserMoviesContext: UserMoviesType = {
  userMovies: [],
  setUserMovies: () => {},
};

export const UserMoviesContext = createContext<UserMoviesType>(defaultUserMoviesContext);

export const UserMoviesProvider = ({ children }: ChildrenType) => {
  const [userMovies, setUserMovies] = useState<MovieType[]>([]);

  return (
    <UserMoviesContext.Provider value={{ userMovies, setUserMovies }}>
      {children}
    </UserMoviesContext.Provider>
  );
};