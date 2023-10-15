import React from 'react';

import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { Preloader } from '../UI/Preloader/Preloader';
import { MOVIES_NOT_FOUND_MESSAGE, MOVIES_SERVER_ERR_MESSAGE } from '../../utils/constants';
import { MovieType } from '../../utils/types';
import { useLocation } from 'react-router-dom';

interface CardListProps {
  cards: MovieType[];
  arrayList: MovieType[];
  isLoading: boolean;
  isRequestError: boolean;
  onAddMore: () => void;
  handleError: (arg: string) => void;
}

export const MoviesCardList = ({
  cards,
  arrayList,
  isLoading,
  isRequestError,
  onAddMore,
  handleError,
}: CardListProps) => {
  const { pathname } = useLocation();
  const mainPage = pathname === '/';
  const warningMessage = isRequestError ? MOVIES_SERVER_ERR_MESSAGE: MOVIES_NOT_FOUND_MESSAGE;

  return isLoading
  ? ( <Preloader />) 
  : (
    <>
      <section className="movies-card-list">
        {cards.length > 0 
        ? (cards.map((movie) => (
            <MoviesCard
              key={movie.nameRU}
              movie={movie}
              handleError={handleError}
            />
          ))) 
        : (
          <p className="movies-card-list__message">{warningMessage}</p>
        )}
      </section>
      {mainPage && arrayList.length > cards.length && (
        <button onClick={onAddMore} className="movies-card-list__button">
          Еще
        </button>
      )}
    </>
  );
}