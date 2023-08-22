import React from "react";

import "./AboutProject.css";
import Title from "../Title/Title";

export default function AboutProject() {
  return (
    <section id="about" className="about">
      <Title title='О проекте' />
      <div className="about__text-container">
        <div className="block">
          <h2 className="block__title">
						Дипломный проект включал 5 этапов
					</h2>
          <p className="block__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="block">
          <h2 className="block__title">
						На выполнение диплома ушло 5 недель
					</h2>
          <p className="block__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__timeframe">
        <div className="about__timeframe-block about__timeframe-block_first-week">
          <p className="about__timeframe-text">1 неделя</p>
        </div>
        <div className="about__timeframe-block about__timeframe-block_other-weeks">
          <p className="about__timeframe-text">4 недели</p>
        </div>
      </div>
      <div className="about__timeframe">
        <div className="about__timeframe-block about__timeframe-block_first-week span">
          <p className="about__timeframe-text grey-color">Back-end</p>
        </div>
        <div className="about__timeframe-block about__timeframe-block_other-weeks span">
          <p className="about__timeframe-text grey-color">Front-end</p>
        </div>
      </div>
    </section>
  );
}
