import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = ({ handleRegisterSubmit, isPending, setPending }) => {
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
    handleRegisterSubmit(data);
  }

  return (
    <div className="authorization">
      <h1 className="authorization__title">Регистрация</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          className="form__input form__input_theme_dark"
          name="email"
          placeholder="Email"
          {...register("email", {
            required: "Вы пропустили это поле",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
              message: "Введите email"
            }
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
            pattern: {
              value: /[a-z][0-9]/,
              message: "Пароль должен содержать латинские символы и хотя бы одну цифру",
            },
            minLength: {
              value: 5,
              message: "Пароль должен содержать не менее 8 символов"
            }
          })}
        />
        <span className="form__input-error">{errors?.password?.message}</span>
        <button className="authorization__button" disabled={!isValid} >
          {isPending ? "Зарегистрироваться..." : "Зарегистрироваться"}
        </button>
      </form>
      <p className="authorization__info">
        Уже зарегистрированы? <Link className="link" to="/signin">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Register;
