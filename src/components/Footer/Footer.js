import React from "react";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title footer__title_underline">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__copyright">&#64; {new Date().getFullYear()}</p>
        <nav className="footer__nav">
          <a
            className="footer__link"
            href="https://beatfilmfestival.ru/"
            target="_blank"
            rel="noreferrer noopener"
          >
            BeatFilm Festival
          </a>
          <a
            className="footer__link"
            href="https://github.com/KonstaBartosh"
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
