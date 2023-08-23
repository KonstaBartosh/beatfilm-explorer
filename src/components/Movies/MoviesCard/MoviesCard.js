import React, { useState } from "react";

import "./MoviesCard.css";
import { useLocation } from "react-router-dom";


export default function MoviesCard({ movie }) {
	const [isLiked, setLike] = useState(false);
	const location = useLocation();
	const baseUrl = ' https://api.nomoreparties.co/';
	const { nameRU, duration, image, trailerLink } = movie;

  const formatTime = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours ? `${hours}ч` : ''} ${minutes}м`;
  }
	const handleLike = () => setLike(!isLiked);

	const cardLikeButtonClassName = (`card__btn card__like ${isLiked && 'card__like_active'}`); 
	const button = location.pathname === '/movies' ? 
		(<button className={cardLikeButtonClassName} type="submit" onClick={handleLike}/>) :
		(<button className="card__btn card__like_rm" type="submit">&#x2717;</button>)

  return (
    <div className="card">
			<a href={trailerLink}>
				<img src={`${baseUrl}${image.url}`} alt={nameRU} className="card__image" />
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
