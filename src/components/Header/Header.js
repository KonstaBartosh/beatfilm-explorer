import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";

import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";


function Header() {
  const isUserLogin = localStorage.getItem('isUserLogin')
  const { pathname } = useLocation();
  const isLoggedInPaths = ["/profile", "/movies", "/saved-movies"];
  const headerStyle = isLoggedInPaths.includes(pathname)
    ? "header_movies-logged-in"
    : "header_main-logged-in";


  const profileMarkup = isUserLogin ? (
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
    <header className={`header ${isUserLogin && headerStyle}`}>
      <div className="header__container">
        <Logo />
        {isUserLogin && <Navigation />}
        {profileMarkup}
        {isUserLogin && <BurgerMenu />}
      </div>
    </header>
  );
}

export default Header;
