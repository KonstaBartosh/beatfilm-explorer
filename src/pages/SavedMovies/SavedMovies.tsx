import React, { useContext, useEffect, useState } from "react";

import "./SavedMovies.css";
import SearchForm from "../../components/UI/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
import { SHORT_MOVIE_LENGTH } from "../../utils/constants";
import { filterMovies } from "../../utils/filterMovies";
import { UserMoviesContext } from "../../context/UserMoviesContext";
import { MovieType } from "../../utils/types";

interface SavedMoviesProps {
  getUserMovies: () => void;
}


function SavedMovies({ getUserMovies }: SavedMoviesProps) {
  const {userMovies, setUserMovies} = useContext(UserMoviesContext);
  const [filteredUserMovies, setFilteredUserMovies] = useState<MovieType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isToggled, setIsToggled] = useState<boolean>(false);

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

  const handleOnChange = (evt) => {
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
      setUserMovies(JSON.parse(localStorage.getItem("userMovies")));
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