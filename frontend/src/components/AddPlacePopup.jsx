import React, { useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = memo(({ isOpen, onClose, onAddCard, isPending, setPending }) => {
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
  }, [reset, isOpen]);

  const onSubmit = (data) => {
    setPending(true);
    onAddCard(data);
  };

  return (
    <PopupWithForm
      name="add-card" 
      title="Новое место" 
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
      isValid={isValid}
    >
      <input
        id="name-card-input"
        type="text"
        className="form__input"
        placeholder="Название"
        {...register("title", {
          required: "Вы пропустили это поле",
          minLength: {
            value: 2,
            message: "Текст должен быть не короче 2 симвоволов",
          },
          maxLength: {
            value: 30,
            message: "Текст должен быть не длиннее 30 симвоволов"
          },
        })}
      />
      <span className="form__input-error">{errors?.title?.message}</span>
      <input
        id="link-input"
        type="url"
        className="form__input"
        placeholder="Ссылка на картинку"
        {...register("link", {
          required: "Вы пропустили это поле",
          pattern: {
            value: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
            message: "Введите url"
          },
        })}
      />
      <span className="form__input-error">{errors?.link?.message}</span>
    </PopupWithForm>
  );
});

export default AddPlacePopup;