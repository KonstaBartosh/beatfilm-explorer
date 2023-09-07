import "../AuthForm/AuthForm.css";

export default function EmailInput({
	type,
  title,
  label,
  register,
  errors,
  placeholder,
  defaultValue,
}) {

	const emailPatternMessage = `Адрес электронной почты должен содержать символ ' @ ' 
    и минимум 2 символа для домена`;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

  return (
    <>
      <label className="auth-form__label">{label}</label>
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
            value: emailRegex,
            message: emailPatternMessage,
          },
        })}
        id={`${title}-input`}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="auth-form__input"
      />
      <span className="auth-form__error-message auth-form__error-message_active">
        {errors?.[title] && <div>{errors?.[title]?.message}</div>}
      </span>
    </>
  );
}
