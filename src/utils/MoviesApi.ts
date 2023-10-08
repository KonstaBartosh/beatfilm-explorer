import { MovieType } from "./types";
import { checkResponse} from "./helpers";
import { JSON_HEADERS, METHOD, URL_MOVIES_REQUEST } from "./constants";

export const getMovies = (): Promise<MovieType[]> => {
	return fetch(URL_MOVIES_REQUEST, 
		{
			method: METHOD.GET,
			headers: JSON_HEADERS,
		})
	.then((res) => checkResponse<MovieType[]>(res));
}