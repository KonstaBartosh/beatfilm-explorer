import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./MoviesCard.css";
import * as api from "../../../utils/MainApi";
import { movieServerUrl } from "../../../utils/constants";

function MoviesCard({ movie }) {
	const [isLiked, setLike] = useState(false);
	const location = useLocation();

	const { nameRU, duration, image, trailerLink } = movie;

  const formatTime = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours ? `${hours}ч` : ''} ${minutes}м`;
  }

	function handleSaveMovie() {
		console.log('save click!');
		api
			.saveUserMovie(movie)
			.then((savedMovie) => {
				setLike(true);
				movie._id = savedMovie._id;
			})
			.catch((err) => console.log(`Возникла ошибка ${err}`))
	}

	function handelRemoveMovie() {
		api
			.removeUserMovie(movie._id)
			.then(() => {
				setLike(false)})
			.catch((err) => console.log(`Возникла ошибка ${err}`))
	}

	const toggleLike = () => {
		!isLiked ? handleSaveMovie() : handelRemoveMovie();
	}


	const cardLikeButtonClassName = (`card__btn card__like ${isLiked && 'card__like_active'}`); 
	const button = location.pathname === '/movies' ? 
		(<button className={cardLikeButtonClassName} type="submit" onClick={toggleLike}/>) :
		(<button className="card__btn card__like_rm" type="submit">&#x2717;</button>)

  return (
    <div className="card">
			<a href={trailerLink}>
				<img src={`${movieServerUrl}${image.url}`} alt={nameRU} className="card__image" />
			</a>
      
      <div className="card__header">
				<div className="card__header-wrapper">
					<h2 className="card__title">{nameRU}</h2>
					{button}
				</div>
				<span className="card__subtitle">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default MoviesCard;