import { useForm } from "react-hook-form";

import * as com from "../../components";
import { UserType } from "../../utils/types";

type OnLoginType = (userData: UserType) => void;


export const Login = ({ onLogin }: { onLogin: OnLoginType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const submitData = (data: UserType) => {
    onLogin(data);
  };

  return (
    <com.AuthForm
      title={"Рады видеть!"}
      buttonText={"Войти"}
      navLink={"/sign-up"}
      question={"Ещё не зарегистрированы?"}
      navLinkTitle={"Регистрация"}
      onSubmit={handleSubmit(submitData)}
      isValid={isValid}
    >
      <com.EmailInput
        title={"email"}
        label={"E-mail"}
        placeholder={"E-mail"}
        register={register}
        errors={errors}
      />
      <com.PasswordInput
        title={"password"}
        label={"Пароль"}
        placeholder={"Пароль"}
        register={register}
        errors={errors}
        autoComplete={"current-password"}
      />
    </com.AuthForm>
  );
}