import { useForm } from "react-hook-form";

import TextInput from "../../components/UI/Inputs/TextInput";
import EmailInput from "../../components/UI/Inputs/EmailInput";
import PasswordInput from "../../components/UI/Inputs/PasswordInput";
import AuthForm from "../../components/AuthForm/AuthForm";
import { UserType } from "../../utils/types";

type onRegisterType = (userData: UserType) => void;

function Register({ onRegister }: {onRegister: onRegisterType}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const submitData = (data: UserType) => {
    onRegister(data);
  };

  return (
    <AuthForm
      title={"Добро пожаловать!"}
      buttonText={"Зарегистрироваться"}
      navLink={"/sign-in"}
      question={"Уже зарегистрированы?"}
      navLinkTitle={"Войти"}
      onSubmit={handleSubmit(submitData)}
      isValid={isValid}
    >
      <TextInput
        title={"name"}
        label={"Имя"}
        placeholder={"Имя"}
        register={register}
        errors={errors}
        autoComplete={"name"}
      />
      <EmailInput
        title={"email"}
        label={"E-mail"}
        placeholder={"E-mail"}
        register={register}
        errors={errors}
      />
      <PasswordInput
        title={"password"}
        label={"Пароль"}
        placeholder={"Пароль"}
        register={register}
        errors={errors}
        autoComplete={"new-password"}
      />
    </AuthForm>
  );
}

export default Register;