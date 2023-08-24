	import React from "react";

	import "./SearchForm.css";
	import logo from '../../../images/search_icon.svg'
	import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";

	export default function SearchForm({ searchQuery, handleSearchChange, onSearchClick, onToggle }) {

		return (
			<div className="searchform">
				<form onSubmit={onSearchClick} className="searchform__bar">
					<label className="searchform__label">
						<input
							className="searchform__input"
							id="search-input"
							type="search"
							placeholder="Фильм"
							value={searchQuery}
							onChange={handleSearchChange}
						/>
					</label>
					<button className="searchform__button" type="submit">
						<img className="searchform__icon" src={logo} alt="поиск" />
					</button>
				</form>
				<div className="searchform__toggle-container">
					<ToggleSwitch onToggle={onToggle}/>
					<span className="searchform__toggle-title">Короткометражки</span>
				</div>
				<span className="searchform__border-bottom" />
			</div>
		);
	}
