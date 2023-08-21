import '../AuthForm/AuthForm.css';

export default function TextInput( { title, label, register, errors, placeholder, defaultValue }) {
  return(
    <>
      <label className="auth-form__label">{label}</label>
      <input
        {...register(title, {
          required: "Заполните это поле.",
          minLength: {
            value: 2,
            message: "Текст должен быть не короче 2 символов",
          },
          maxLength: 40
        })}
        id={`${title}-input`}
        type="text"
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