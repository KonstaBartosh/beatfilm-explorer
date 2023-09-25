import "./Input.css"

export default function TextInput({
  type,
  title,
  label,
  register,
  errors,
  placeholder,
  defaultValue,
  autoComplete
}) {
  const namePattern = /^[a-zA-Zа-яА-Я\s-]*$/;

  return (
    <>
      <label className="label">{label}</label>
      <input
        {...register(title, {
          required: "Заполните это поле.",
          minLength: {
            value: 2,
            message: "Текст должен быть не короче 2 символов",
          },
          maxLength: 40,
          pattern: {
            value: namePattern,
            message: 'Данное поле содержит недопустимые символы.'
          }
        })}
        id={`${title}-input`}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="input"
        autoComplete={autoComplete}
      />
      <span className="error-message error-message_active">
        {errors?.[title] && <div>{errors?.[title]?.message}</div>}
      </span>
    </>
  );
}
