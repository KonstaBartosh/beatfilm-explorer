import React, { createContext, useState } from "react";

import { ChildrenType, UserType } from "../utils/types";

interface CurrentUserType {
  currentUser: UserType;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType>>;
}

const defaultUserContext: CurrentUserType = {
  currentUser: {
    name: "",
    email: "",
  },
  setCurrentUser: () => {},
};

export const CurrentUserContext = createContext<CurrentUserType>(defaultUserContext);

export const CurrentUserProvider = ({ children }: ChildrenType ) => {
  const [currentUser, setCurrentUser] = useState(defaultUserContext.currentUser);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
