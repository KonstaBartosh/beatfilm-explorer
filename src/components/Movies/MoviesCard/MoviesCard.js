import React, { useState } from "react";

import "./MoviesCard.css";
import testImg from '../../../images/test-image.jpg'
import { useLocation } from "react-router-dom";

export default function MoviesCard() {
	const [isLiked, setLike] = useState(false);
	const urlPath = useLocation();

	const handleLikeClick = () => setLike(true);
	const cardLikeButtonClassName = (`card__btn card__like ${isLiked && 'card__like_active'}`); 
	
	const button = urlPath.pathname === '/movies' ? 
		(<button class={cardLikeButtonClassName} type="submit" onClick={handleLikeClick}/>) :
		(<button className="card__btn card__like_rm" type="submit">&#x2717;</button>)

  return (
    <div className="card">
      <img src={testImg} alt="" class="card__image" />
      <div class="card__header">
				<div className="card__header-wrapper">
					<h2 class="card__title">Заглушка</h2>
					{button}
				</div>
				<span className="card__subtitle">Заглушка</span>
      </div>
    </div>
  );
}
