import React, { useState } from "react";

import "./MoviesCard.css";

export default function MoviesCard() {
	const [isLiked, setLike] = useState(false);
	const handleLikeClick = () => setLike(true);

	const cardLikeButtonClassName = (`card__like ${isLiked && 'card__like_active'}`); 

  return (
    <div className="card">
      <img src='#' alt="#" class="card__image" />
      <div class="card__header">
				<div className="card__header-wrapper">
					<h2 class="card__title">Заглушка</h2>
					<button 
						class={cardLikeButtonClassName} 
						type="button" 
						alt="Нравится"
						onClick={handleLikeClick}
					/>
				</div>
				<span className="card__subtitle">Заглушка</span>
      </div>
    </div>
  );
}
