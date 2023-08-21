import React from "react";

import "./Tech.css";
import Title from "../Title/Title";

export default function Tech() {
  return (
    <section id="tech" className="tech">
      <Title title="Технологии" />
      <div className="tech__container">
        <h2 className="tech__title">7 технологий</h2>
        <p className="tech__subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
				<div className="tech__stack">
					<div className="tech__stack-tech">HTML</div>
					<div className="tech__stack-tech">CSS</div>
					<div className="tech__stack-tech">JS</div>
					<div className="tech__stack-tech">React</div>
					<div className="tech__stack-tech">Git</div>
					<div className="tech__stack-tech">Express.js</div>
					<div className="tech__stack-tech">MongoDB</div>
				</div>
      </div>
    </section>
  );
}
