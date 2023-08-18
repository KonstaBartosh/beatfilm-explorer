import React from "react";

import "./Header.css";
import Navigation from "./Navigation/Navigation";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";

function Header({ loggedIn }) {
  const url = useLocation();

  const headerStyle =
    url.pathname === "/movies" || url.pathname === "/saved-movies" || url.pathname === "/profile"
      ? "header_movies-logged-in"
      : "header_main-logged-in";

  const profileMarkup = loggedIn ? (
    <NavLink to="/profile" className="header__button header__button_account">Аккаунт</NavLink>
  ) : (
    <nav className="header__profile-nav">
      <button className="header__button header__button_register">Регистрация</button>
      <button className="header__button header__button_logout">Войти</button>
    </nav>
  );

  return (
    <div className={`header ${loggedIn ? headerStyle : ""}`}>
      <div className="header__container">
        <Logo />
        {loggedIn ? <Navigation /> : null}
        {profileMarkup}
        {loggedIn ? <BurgerMenu /> : null}
      </div>
    </div>
  );
}

export default Header;
