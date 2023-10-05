export const GET_YEAR: number = new Date().getFullYear();

export function formatTime(duration: number) {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;
	return `${hours ? `${hours}ч` : ""} ${minutes}м`;
}