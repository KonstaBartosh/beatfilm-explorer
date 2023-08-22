const BASE_URL = 'https://api.moviexplorer.nomoreparties.co';
const json__headers = {
	'Content-Type': 'application/json',
	'Accept': 'application/json'
};

export const register = ({ name, email, password }) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: json__headers,
		body: JSON.stringify({ name, email, password })
	})
	.then((res) => {
		if (res === res.ok) {
			res.json();
		}
		else {
			Promise.reject(`Упс.. ошибка ${res.status}`)
		}
	});
};

export const login = ({ email, password }) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: json__headers,
		body: JSON.stringify({ email, password })
	})
	.then((res) => {
		if (res === res.ok) {
			res.json();
		}
		else {
			Promise.reject(`Упс.. ошибка ${res.status}`)
		}
	});
};

