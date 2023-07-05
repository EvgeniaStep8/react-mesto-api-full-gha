import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isPending, setPending }) => {
  const currentUser = useContext(CurrentUserContext);

  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onChange",
  });


  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("about", currentUser.about);
  }, [setValue, currentUser, isOpen]);

  const onSubmit = (data) => {
    setPending(true);
    onUpdateUser(data);
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
      isValid={isValid}
    >
      <input
        id="name-input"
        type="text"
        className="form__input form__input_type_name"
        placeholder="Имя"
        maxLength={40}
        {...register("name", {
          required: "Вы пропустили это поле",
          minLength: {
            value: 2,
            message: "Текст должен быть не короче 2 симвоволов",
          },
        })}
        
      />
      <span className="form__input-error">{errors?.name?.message}</span>
      <input
        id="job-input"
        type="text"
        className="form__input form__input_type_job"
        placeholder="О себе"
        maxLength={200}
        {...register("about", {
          required: "Вы пропустили это поле",
          minLength: {
            value: 2,
            message: "Текст должен быть не короче 2 симвоволов",
          },
        })}
      />
      <span className="form__input-error">{errors?.about?.message}</span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
