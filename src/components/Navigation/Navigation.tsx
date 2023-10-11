import "./Navigation.css";
import NavButton from "../UI/NavButton/NavButton";

function Navigation() {
  return (
    <nav className="navigation">
      <div className="navigation__movies">
        <NavButton
          text="Фильмы"
          path="/"
          className="navigation__movies-link"
        />
        <NavButton
          text="Сохраненные фильмы"
          path="/saved-movies"
          className="navigation__movies-link"
        />
      </div>
    </nav>
  );
}

export default Navigation;
