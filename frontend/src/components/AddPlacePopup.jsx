import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({
  isOpen,
  onClose,
  onAddCard,
  isPending,
  setPending,
}) => {
  const {
    register,
    formState: { errors, isValid },
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
        maxLength={30}
        {...register("title", {
          required: "Вы пропустили это поле",
          minLength: {
            value: 2,
            message: "Текст должен быть не короче 2 симвоволов",
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
            value:
            // eslint-disable-next-line no-useless-escape
            /https*:\/\/(www.)*[a-z0-9\-\.]{1,}\.[a-z]{2,3}[a-z0-9\-\._~\:\/\?\#\[\]@\!\$&'\(\)\*\+,;\=]*/,
            message: "Введите url",
          },
        })}
      />
      <span className="form__input-error">{errors?.link?.message}</span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
