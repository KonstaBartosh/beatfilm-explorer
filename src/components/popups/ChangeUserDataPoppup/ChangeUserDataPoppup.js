import React from "react";

import "./ChangeUserDataPoppup.css";

function ChangeUserDataPoppup({ title, onClose }) {
  return (
    <section className="popup popup_opened">
      <div className="popup__container">
        <button
          className="popup__close-button"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        />
				<p className="popup__title">dsfsfsdf</p>
        <div>sdsdsdasadad</div>
      </div>
    </section>
  );
}

export default ChangeUserDataPoppup;
