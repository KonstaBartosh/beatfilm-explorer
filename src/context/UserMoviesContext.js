import React, { createContext, useState } from "react";

export const UserMoviesContext = createContext();

export const UserMoviesProvider = ({ children }) => {
	const [userMovies, setUserMovies] = useState([]);

	return(
		<UserMoviesContext.Provider value={{ userMovies, setUserMovies }}>
			{children}
		</UserMoviesContext.Provider>
	);
}