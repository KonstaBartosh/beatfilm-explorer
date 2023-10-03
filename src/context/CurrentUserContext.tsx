import React, { createContext, useState } from "react";

interface CurrentUserType {
  currentUser: {
    name: string;
    email: string;
    password: string;
  };
  setCurrentUser: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      password: string;
    }>
  >;
}

const defaultUserContext: CurrentUserType = {
	currentUser: {
		name: '',
		email: '',
		password: ''
	},
	setCurrentUser: () => {}
}


export const CurrentUserContext = createContext<CurrentUserType>(defaultUserContext);

export const CurrentUserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(defaultUserContext.currentUser);

	return(
		<CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</CurrentUserContext.Provider>
	);
}