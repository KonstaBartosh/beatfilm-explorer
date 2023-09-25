import "./Input.css"
import { EMAIL_REGEX, INVALID_EMAIL_MESSAGE } from "../../utils/constants";

export default function EmailInput({
	type,
  title,
  label,
  register,
  errors,
  placeholder,
  defaultValue,
}) {

  return (
    <>
      <label className="label">{label}</label>
      <input
        {...register("email", {
          required: "Заполните это поле.",
          minLength: {
            value: 6,
            message: "Минимум 6 символов",
          },
          maxLength: {
            value: 40,
            message: "Электронная почта должна содержать не более 40 символов",
          },
          pattern: {
            value: EMAIL_REGEX,
            message: INVALID_EMAIL_MESSAGE,
          },
        })}
        id={`${title}-input`}
        type='email'
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="input"
        autoComplete="email"
      />
      <span className="error-message error-message_active">
        {errors?.[title] && <div>{errors?.[title]?.message}</div>}
      </span>
    </>
  );
}
