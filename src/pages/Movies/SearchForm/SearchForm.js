import React from "react";

import "./SearchForm.css";
import logo from '../../../images/search_icon.svg'
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";

export default function SearchForm() {
  return (
    <div className="searchform">
      <form className="searchform__bar" noValidate>
				<label className="searchform__label">
					<input 
						className="searchform__input"
						id="search-input" 
						type="search"
						placeholder="Фильм"
						value=""
						required 
					/>
				</label>

				<button 
					className="searchform__button" 
					type="submit"
				>
					<img className="searchform__icon" src={logo} alt="поиск"/>
				</button>
      </form>
			<div className="searchform__toggle-container">
				<ToggleSwitch />
				<span className="searchform__toggle-title">Короткометражки</span>
			</div>
			<span className="searchform__border-bottom"/>
    </div>
  );
}
