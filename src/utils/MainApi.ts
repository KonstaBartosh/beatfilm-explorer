import { BASE_URL, JSON_HEADERS, METHOD, URL_MOVIE_SERVER } from "./constants";
import { checkResponse } from "./helpers";
import { MovieType, UserType } from "./types";


export const register = ({ name, email, password }: UserType) => {
	return fetch(`${BASE_URL}/signup`, {
		method: METHOD.POST,
		headers: JSON_HEADERS,
		body: JSON.stringify({ name, email, password })
	})
	.then(res => checkResponse<UserType>(res));
};

export const login = ({ email, password }: UserType) => {
	return fetch(`${BASE_URL}/signin`, {
		method: METHOD.POST,
		headers: JSON_HEADERS,
		body: JSON.stringify({ email, password })
	})
	.then(res => checkResponse<UserType>(res));
};

export function checkToken() {
	return fetch(`${BASE_URL}/users/me`, {
		method: METHOD.GET,
		headers: {
			...JSON_HEADERS,
			"Authorization": `Bearer ${localStorage.getItem('token')}`,
		}
	})
	.then((res) => res.json())
	.then(data => data)
}

export function getUserData() {
	return fetch(`${BASE_URL}/users/me`, {
		method: METHOD.GET,
		headers: {
			...JSON_HEADERS,
			"Authorization": `Bearer ${localStorage.getItem('token')}`,
		}
	})
	.then(res => checkResponse<UserType>(res));
}

export function getUserMovies() {
	return fetch(`${BASE_URL}/movies`, {
		method: METHOD.GET,
		headers: {
			...JSON_HEADERS,
			"Authorization": `Bearer ${localStorage.getItem('token')}`,
		}
	})
	.then(res => checkResponse<MovieType[]>(res));
}

export function changeUserData({ name, email }: UserType) {
	return fetch(`${BASE_URL}/users/me`, {
		method: METHOD.PATCH,
		headers: {
			...JSON_HEADERS,
			"Authorization": `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({ name, email })
	})
	.then(res => checkResponse<UserType>(res));
}

export const saveUserMovie = (movie: MovieType) => {
	return fetch(`${BASE_URL}/movies`, {
		method: METHOD.POST,
		headers: {
			...JSON_HEADERS,
			"Authorization": `Bearer ${localStorage.getItem('token')}`,
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
	.then(res => checkResponse<MovieType>(res));
};

export const removeUserMovie = (movieId: MovieType) => {
	return fetch(`${BASE_URL}/movies/${movieId}`, {
		method: METHOD.DELETE,
		headers: {
			...JSON_HEADERS,
			"Authorization": `Bearer ${localStorage.getItem('token')}`,
		}	
	})
	.then(res => checkResponse<MovieType>(res));
}