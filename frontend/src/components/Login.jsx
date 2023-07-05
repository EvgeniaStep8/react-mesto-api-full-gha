import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const Login = ({ handleLoginSubmit, isPending, setPending }) => {
	const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    reset();
  }, [reset]);

  const onSubmit = (data) => {
    setPending(true);
    handleLoginSubmit(data);
  }
	
  return (
		<div className="authorization">
			<h1 className="authorization__title">Вход</h1>
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<input
          type="email"
          className="form__input form__input_theme_dark"
          name="email"
          placeholder="Email"
          {...register("email", {
            required: "Вы пропустили это поле",
          })}
        />
        <span className="form__input-error">{errors?.email?.message}</span>
        <input
          type="password"
          className="form__input form__input_theme_dark"
          name="password"
          placeholder="Пароль"
          {...register("password", {
            required: "Вы пропустили это поле",
          })}
        />
        <span className="form__input-error">{errors?.password?.message}</span>
				<button className="form__submit-button form__submit-button_type_authorization" disabled={!isValid} >
				  {isPending ? "Войти..." : "Войти"}
				</button>
			</form>
		</div>
	)
}

export default Login;