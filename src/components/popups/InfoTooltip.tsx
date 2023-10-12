import "../popups/popup.css";
import successLogo from "../../images/registration-success.svg";
import deniedLogo from "../../images/registration-denied.svg";

interface ToolTipProps {
  isOpen: boolean;
  condition: boolean;
  onClose: () => void;
  successTitle: string;
  deniedTitle: string;
}


export const InfoTooltip = ({
  isOpen,
  condition,
  onClose,
  successTitle,
  deniedTitle,
}: ToolTipProps) => {
  return (
    <section
      className={`popup ${isOpen && "popup_opened"}`}
    >
      <div className="popup__container overlay">
        {condition ? (
          <>
            <img
              className="popup__image"
              src={successLogo}
              alt={successTitle}
            />
            <p className="popup__title">{successTitle}</p>
          </>
        ) : (
          <>
            <button
              className="popup__close-button"
              aria-label="Закрыть"
              type="button"
              onClick={onClose}
            />
            <img
              className="popup__image"
              src={deniedLogo}
              alt={deniedTitle}
            />
            <p className="popup__title">{deniedTitle}</p>
          </>
        )}
      </div>
    </section>
  );
}