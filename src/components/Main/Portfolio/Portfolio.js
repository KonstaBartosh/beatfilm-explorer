import React from "react";

import "./Portfolio.css";
import Title from "../Title/Title";
import photo from "../../../images/photo.jpeg";
import { sampleWorkOne, sampleWorkThree, sampleWorkTwo } from "../../../utils/constants";

export default function Portfolio() {
  const getSampleMarkup = (title, link) => {
    return (
      <div className="portfolio__exaple-container _underline">
        <p className="portfolio__example-sample">{title}</p>
        <a className="portfolio__example-link" href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
					&#x2197;
				</a>
      </div>
    );
  };

  return (
    <section className="portfolio">
      <Title title="Студент" />
      <div className="portfolio__about">
        <div className="portfolio__about-container">
          <h2 className="portfolio__title">Фома Киняев</h2>
          <p className="portfolio__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="portfolio__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="portfolio__github"
            href="https://github.com/KonstaBartosh"
          >
            Github
          </a>
        </div>
        <img src={photo} className="portfolio__img" alt="фото" />
      </div>
      <span className="portfolio__sign">Портфолио</span>
      <div className="portfolio__exaples-container">
        {getSampleMarkup("Статичный сайт", sampleWorkOne)}
        {getSampleMarkup("Адаптивный сайт", sampleWorkTwo)}
        {getSampleMarkup("Одностраничное приложение", sampleWorkThree)}
      </div>
    </section>
  );
}
