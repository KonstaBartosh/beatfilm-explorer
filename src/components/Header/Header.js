import React from "react";

import "./Header.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";

function Header({ isLoggedIn }) {
  const url = useLocation();

  const headerStyle =
    url.pathname === "/movies" ||
    url.pathname === "/saved-movies" ||
    url.pathname === "/profile"
      ? "header_movies-logged-in"
      : "header_main-logged-in";

  const profileMarkup = isLoggedIn ? (
    <NavLink to="/profile" className="header__button header__button_account">
      Аккаунт
    </NavLink>
  ) : (
    <nav className="header__profile-nav">
      <NavLink to="/sign-up" className="header__button header__button_register">
        Регистрация
      </NavLink>
      <NavLink to="/sign-in" className="header__button header__button_logout">
        Войти
      </NavLink>
    </nav>
  );

  return (
    <header className={`header ${isLoggedIn ? headerStyle : ""}`}>
      <div className="header__container">
        <Logo />
        {isLoggedIn ? <Navigation /> : null}
        {profileMarkup}
        {isLoggedIn ? <BurgerMenu /> : null}
      </div>
    </header>
  );
}

export default Header;
