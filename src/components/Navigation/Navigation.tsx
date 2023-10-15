import React from "react";

import "./Navigation.css";
import { NavButton } from "../UI/NavButton/NavButton";
import { PATH } from "../../utils/constants";


export const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="navigation__movies">
        <NavButton
          text="Фильмы"
          path={PATH.HOME}
          className="navigation__movies-link"
        />
        <NavButton
          text="Сохраненные фильмы"
          path={PATH.SAVED_MOVIES}
          className="navigation__movies-link"
        />
      </div>
    </nav>
  );
}