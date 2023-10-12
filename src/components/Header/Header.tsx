import "./Header.css";
import * as ui from "../../components";


export const Header = () => {
  const isUserLogin = localStorage.getItem('isUserLogin')

  const profileMarkup = isUserLogin ? (
    <ui.NavButton
      text="Аккаунт"
      path="/profile"
      className="header__button header__button_account"
    /> 
    ) : (
    <nav className="header__profile-nav">
      <ui.NavButton
        text="Регистрация"
        path="/sign-up"
        className="header__button header__button_register"
      />
      <ui.NavButton
        text="Войти"
        path="/sign-in"
        className="header__button header__button_logout"
      />
    </nav>
  );

  return (
    <header className="header">
      <div className="header__container">
        <ui.Logo />
        {isUserLogin && <ui.Navigation />}
        {profileMarkup}
        {isUserLogin && <ui.BurgerMenu />}
      </div>
    </header>
  );
}
