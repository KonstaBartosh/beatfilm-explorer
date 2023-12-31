import React, { ChangeEvent, useState } from "react";

import "./SearchForm.css";
import logo from "../../../images/search_icon.svg";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";

interface SearchFormProps {
  searchQuery: string;
  defaultValue: string;
  isToggled: boolean;
  onSearchClick: () => void;
  onToggle: () => void;
  handleSearchChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}


export const SearchForm = ({
  searchQuery,
  handleSearchChange,
  onSearchClick,
  onToggle,
  defaultValue,
  isToggled,
}: SearchFormProps) => {
  const [validationError, setValidationError] = useState<string>("");

  const handleSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    if (searchQuery === "") {
      setValidationError("Нужно ввести ключевое слово");
      return;
    }
    setValidationError("");
    onSearchClick();
  };

  return (
    <div className="searchform">
      <form onSubmit={handleSubmit} className="searchform__bar">
        <label className="searchform__label">
          <input
            className="searchform__input"
            id="search-input"
            type="search"
            placeholder="Фильм"
            defaultValue={defaultValue}
            onChange={handleSearchChange}
            autoComplete="off"
          />
        </label>
        <button className="searchform__button" type="submit" aria-label="Поиск">
          <img className="searchform__icon" src={logo} alt="Поиск" />
        </button>
      </form>
      {validationError && (
        <span className="searchform__validation">
          Нужно ввести ключевое слово
        </span>
      )}
      <div className="searchform__toggle-container">
        <ToggleSwitch onToggle={onToggle} isToggled={isToggled} />
        <span className="searchform__toggle-title">Короткометражки</span>
      </div>
      <span className="searchform__border-bottom" />
    </div>
  );
}

// export default SearchForm;
