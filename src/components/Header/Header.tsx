import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";


function Header() {
  const isUserLogin = localStorage.getItem('isUserLogin')

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
    <header className="header">
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
