import React, { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = memo(({ isOpen, onClose, onUpdateAvatar, isPending, setPending }) => {
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
  }, [isOpen, reset]);

  const onSubmit = (data) => {
    setPending(true);
    onUpdateAvatar(data);
  };

  return (
    <PopupWithForm
      name="update-avatar" 
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
      isValid={isValid}
    >
      <input
        id="link-avatar-input"
        type="url"
        className="form__input form__input_type_link"
        placeholder="Ссылка на картинку профиля"
        {...register("avatar", {
          required: "Вы пропустили это поле",
          pattern: {
            value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
            message: "Введите url"
          },
        })}
        required
      />
      <span className="form__input-error">{errors?.avatar?.message}</span>
    </PopupWithForm>
  );
});

export default EditAvatarPopup;
