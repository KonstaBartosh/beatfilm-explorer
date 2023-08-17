import React from "react";

import "./Header.css";
import Navigation from "./Navigation/Navigation";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import logo from "../../images/logo.svg";
import { NavLink, useLocation } from "react-router-dom";

function Header({ loggedIn }) {
  const url = useLocation();
  const headerStyle =
    url.pathname === "/movies" || "/saved-movies"
      ? "header_movies-logged-in"
      : "header_main-logged-in";

  const markupForHeader = loggedIn ? (
    <button className="header__button header__button_account">Аккаунт</button>
  ) : (
    <nav className="header__profile-nav">
      <button className="header__button header__button_register">
        Регистрация
      </button>
      <button className="header__button header__button_logout">Войти</button>
    </nav>
  );

  return (
    <div className={`header ${loggedIn ? headerStyle : ""}`}>
      <div className="header__container">
        <NavLink to="/">
          <img src={logo} className="header__logo" alt="логотип" />
        </NavLink>
        {loggedIn ? <Navigation /> : null}
        {markupForHeader}
        {loggedIn ? <BurgerMenu /> : null}
      </div>
    </div>
  );
}

export default Header;
