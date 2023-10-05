export function getFromLocalStorage(key, value = null) {
	const item = localStorage.getItem(key);
	return item ? JSON.parse(item) : value;
}

export function setLocalStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

//** чтение значений из localStorage */
export const LOCAL_STORAGE = {
	IS_USER_LOGGED: getFromLocalStorage("isUserLogin"),
	ALL_MOVIES: getFromLocalStorage("allMovies" || []),
	SHORT_MOVIES: getFromLocalStorage("shortMovies"),
	SEARCH_LIST: getFromLocalStorage("searchList"),
	SEARCH_QUERY: getFromLocalStorage("query"),
	IS_TOGGLED: getFromLocalStorage("isToggled"),
}
