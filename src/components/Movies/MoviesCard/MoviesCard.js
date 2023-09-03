	import React, { useContext, useEffect, useState } from "react";
	import { useLocation } from "react-router-dom";

	import "./MoviesCard.css";
	import * as api from "../../../utils/MainApi";
	import { movieServerUrl } from "../../../utils/constants";
	import { UserMoviesContext } from "../../../context/context";

	function MoviesCard({ movie }) {
		const {userMovies, setUserMovies} = useContext(UserMoviesContext);
		const location = useLocation();
		const [isLiked, setLike] = useState(false);

		const { nameRU, duration, image, trailerLink, _id } = movie;

		const picture = location.pathname === "/movies"
				? `${movieServerUrl}${image.url}`
				: image.url;

		const cardLikeButtonClassName = (`card__btn card__like ${isLiked && 'card__like_active'}`);

		useEffect(() => {
			// есть ли фильм в списке лайкнутых => установить начальное состояние isLiked
			setLike(
				userMovies.some((userMovie) => userMovie.nameRU === movie.nameRU)
				);
		}, [userMovies, movie.nameRU]);

		function formatTime(duration) {
			const hours = Math.floor(duration / 60);
			const minutes = duration % 60;
			return `${hours ? `${hours}ч` : ""} ${minutes}м`;
		};

		function handleSaveMovie() {
			console.log("save click!");
			api
				.saveUserMovie(movie)
				.then(() => {
					// setUserMovies([...userMovies, movie])
					setLike(true);
				})
				.catch((err) => console.log(`Возникла ошибка ${err}`));
		}

		function handelRemoveMovie() {
			console.log("Removing movie:", movie);
			api
				.removeUserMovie(_id)
				.then(() => {
					setLike(false);
					setUserMovies(userMovies.filter((userMovie) => userMovie.nameRU !== movie.nameRU));
				})
				.catch((err) => console.log(`Возникла ошибка ${err}`));
		}

		const toggleLike = () => {
			if (!isLiked) {
				handleSaveMovie();
			} else {
				handelRemoveMovie()
			}
		};

		const button = location.pathname === "/movies" ? (
				<button className={cardLikeButtonClassName} type="submit" onClick={toggleLike}/>
			) : (
				<button className="card__btn card__like_rm" type="submit" onClick={handelRemoveMovie}>
					&#x2717;
				</button>
			);

		return (
			<div className="card">
				<a href={trailerLink}>
					<img src={picture} alt={nameRU} className="card__image" />
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
