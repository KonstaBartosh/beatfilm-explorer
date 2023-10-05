import React from "react";
import "./Header.css";

import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Logo from "../UI/Logo/Logo";
import Navigation from "../Navigation/Navigation";
import NavButton from "../UI/NavButton/NavButton";


function Header() {
  const isUserLogin = localStorage.getItem('isUserLogin')

  const profileMarkup = isUserLogin ? (
    <NavButton
      text="Аккаунт"
      path="/profile"
      className="header__button header__button_account"
    /> 
    ) : (
    <nav className="header__profile-nav">
      <NavButton
        text="Регистрация"
        path="/sign-up"
        className="header__button header__button_register"
      />
      <NavButton
        text="Войти"
        path="/sign-in"
        className="header__button header__button_logout"
      />
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
