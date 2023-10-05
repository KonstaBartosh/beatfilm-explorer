import { BASE_URL, URL_MOVIE_SERVER } from "./constants";
import { UserType } from "./types";

const jsonHeaders = {
	'Content-Type': 'application/json',
	'Accept': 'application/json'
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((data) => {
    return Promise.reject(`Ошибка: ${data.message}`);
  });
}


export const register = ({ name, email, password }: UserType) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: jsonHeaders,
		body: JSON.stringify({ name, email, password })
	})
	.then(checkResponse)
};

export const login = ({ email, password }: UserType) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: jsonHeaders,
		body: JSON.stringify({ email, password })
	})
	.then(checkResponse)
};

export function checkToken() {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			...jsonHeaders,
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	})
	.then((res) => res.json())
	.then(data => data)
}

export function getUserData() {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			...jsonHeaders,
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	})
	.then(checkResponse)
}

export function getUserMovies() {
	return fetch(`${BASE_URL}/movies`, {
		method: 'GET',
		headers: {
			...jsonHeaders,
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	})
	.then(checkResponse)
}

export function changeUserData({ name, email }: UserType) {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'PATCH',
		headers: {
			...jsonHeaders,
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		},
		body: JSON.stringify({ name, email })
	})
	.then(checkResponse)
}

export const saveUserMovie = (movie) => {
	return fetch(`${BASE_URL}/movies`, {
		method: 'POST',
		headers: {
			...jsonHeaders,
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		},
		body: JSON.stringify({
			country: movie.country,
			director: movie.director,
			duration: movie.duration,
			year: movie.year,
			description: movie.description,
			image: {url: `${URL_MOVIE_SERVER}${movie.image.url}`},
			trailerLink: movie.trailerLink,
			nameRU: movie.nameRU,
			nameEN: movie.nameEN,
			thumbnail: `${URL_MOVIE_SERVER}${movie.image.url}`,
			movieId: movie.id,
		})
	})
	.then(checkResponse)
  .then(savedMovie => movie._id = savedMovie._id);
};

export const removeUserMovie = (movieId) => {
	return fetch(`${BASE_URL}/movies/${movieId}`, {
		method: 'DELETE',
		headers: {
			...jsonHeaders,
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}	
	})
	.then(checkResponse)
}