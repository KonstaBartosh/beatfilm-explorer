import React from "react";

import "./Footer.css";
import { BEAT_FILM_URL, FOOTER_TITLE, GITHUB_URL } from "../../utils/constants";
import { GET_YEAR } from '../../utils/helpers';

export const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__title footer__title_underline">
        {FOOTER_TITLE}
      </p>
      <div className="footer__container">
        <p className="footer__copyright">&#64; {GET_YEAR}</p>
        <nav className="footer__nav">
          <a
            className="footer__link"
            href={BEAT_FILM_URL}
            target="_blank"
            rel="noreferrer noopener"
          >
            BeatFilm Festival
          </a>
          <a
            className="footer__link"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
          >
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}