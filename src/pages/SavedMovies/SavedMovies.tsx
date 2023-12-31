import React, { useContext, useEffect, useState } from "react";

import "./SavedMovies.css";
import { MoviesCardList, SearchForm } from "../../components";
import { SHORT_MOVIE_LENGTH } from "../../utils/constants";
import { filterMovies } from "../../utils/filterMovies";
import { UserMoviesContext } from "../../context/UserMoviesContext";
import { MovieType } from "../../utils/types";
import { getFromLocalStorage } from "../../utils/helpers";


export const SavedMovies = ({ getUserMovies }: {getUserMovies: () => void}) => {
  const {userMovies, setUserMovies} = useContext(UserMoviesContext);
  const [filteredUserMovies, setFilteredUserMovies] = useState<MovieType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isToggled, setIsToggled] = useState(false);

  //** подгружаем сохраненные фильмы из БД */
  useEffect(() => {
    getUserMovies();
  }, []);

  useEffect(() => {
    setFilteredUserMovies(userMovies);
  }, [userMovies])

  function handleSearchUserMovies() {
    const filtered: MovieType[] = filterMovies(userMovies, isToggled, searchQuery)
    setFilteredUserMovies(filtered);
  }

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = evt.target.value;
    setSearchQuery(value);
  }

  //** переключатель короткометражек */
  function handleToggleSwitch() {
    if (isToggled === false) {
      const shortMoviesList = userMovies.filter((movie) => movie.duration < SHORT_MOVIE_LENGTH)
      setIsToggled(true);
      setUserMovies(shortMoviesList);;
      localStorage.setItem('userMovies', JSON.stringify(userMovies));
    } else {
      setIsToggled(false);
      setUserMovies(getFromLocalStorage("userMovies"));
      localStorage.removeItem("userMovies");
    }
  }

  return (
    <section className="saved-movies">  
      <SearchForm
        onSearchClick={handleSearchUserMovies}
        handleSearchChange={handleOnChange}
        onToggle={handleToggleSwitch}
        searchQuery={searchQuery}
        defaultValue=''
        isToggled={isToggled}
      />
      <MoviesCardList 
        arrayList={userMovies}
        cards={filteredUserMovies}
        isLoading={false} 
        isRequestError={false} 
        onAddMore={() => {}} 
        handleError={() => {}}      
      />
    </section>
  );
}

export default SavedMovies;