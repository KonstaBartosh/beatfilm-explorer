export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const jsonHeaders = {
	'Content-Type': 'application/json',
	'Accept': 'application/json'
}

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Упс...Ошибка: ${res.status}`);
}

export const getMovies = () => {
	return fetch(BASE_URL, {
		method: 'GET',
		headers: jsonHeaders,
	})
	.then(checkResponse)
}