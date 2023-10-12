import { useState } from "react";

import "./styles/Input.css";
import icon from '../../../images/eye_icon.svg';
import { Inputs } from "../../../utils/types";

export const PasswordInput = ({
  title,
  label,
  register,
  errors,
  placeholder,
  defaultValue,
  autoComplete
}: Inputs) => {
  const [iShowPassword, setShowPassword] = useState<boolean>(false);
  
  const toggleShowPassword = () => {
    setShowPassword(!iShowPassword);
  }

  return (
    <>
      <label className="label">{label}</label>
      <div className="input-wrap">
        <input
          {...register("password", {
            required: "Заполните это поле.",
            minLength: {
              value: 5,
              message: "Минимум 5 символов",
            },
            maxLength: 40,
          })}
          id={`${title}-input`}
          type={iShowPassword ? 'text' : 'password'}
          placeholder={placeholder}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          className="input"
        />
        <button
          className="show-password-button"
          type="button"
          onClick={toggleShowPassword}
          >
            <img src={icon} alt="Показать пароль" />
        </button>
      </div>

      <span className="error-message error-message_active">
        {errors?.[title] && <div>{errors?.[title]?.message}</div>}
      </span>
    </>
  );
}