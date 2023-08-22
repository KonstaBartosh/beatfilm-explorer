const BASE_URL = 'https://api.moviexplorer.nomoreparties.co';
const jsonHeaders = {
	'Content-Type': 'application/json',
	'Accept': 'application/json'
}


export const register = ({ name, email, password }) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: jsonHeaders,
		body: JSON.stringify({ name, email, password })
	})
	.then(res => res.ok? res.json() : Promise.reject(`Ошибка: ${res.status}`))
};

export const login = ({ email, password }) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: jsonHeaders,
		body: JSON.stringify({ email, password })
	})
	.then(res => res.ok? res.json() : Promise.reject(`Ошибка: ${res.status}`))
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

