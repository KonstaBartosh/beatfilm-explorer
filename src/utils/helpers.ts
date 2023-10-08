export const GET_YEAR: number = new Date().getFullYear();

export function formatTime(duration: number): string {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;
	return `${hours ? `${hours}ч` : ""} ${minutes}м`;
}

export function getFromLocalStorage<T>(key: string, defaultValue: T | null = null): T | null {
	const item = localStorage.getItem(key);
	return item ? JSON.parse(item) as T : defaultValue;
}

export function setLocalStorage<T>(key: string, value: T | null ): void {
	localStorage.setItem(key, JSON.stringify(value));
}

export const checkResponse = <T>(res: Response): Promise<T> => {
	if (res.ok) {
		return res.json();
	}
	return res.json().then((data) => Promise.reject(`Ошибка: ${data.message}`));
}