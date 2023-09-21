import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";

export default function EditProfilePopup({
    isOpen,
    onClose,
    onUpdateUser,
    isLoading,
}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            name={"edit-profile"}
            title={"Редактировать профиль"}
            button={"Сохранить"}
            onSubmit={handleSubmit}
            buttonLoading={isLoading ? "Загрузка..." : "Сохранить"}
        >
            <input
                id="nameInput"
                type="text"
                className="popup__input popup__input_user_name"
                name="name"
                placeholder="Имя пользователя"
                required
                minLength="2"
                maxLength="40"
                onChange={handleChangeName}
                value={name || ""}
            />
            <span className="popup__form-error popup__form-error-name"></span>
            <input
                id="jobInput"
                type="text"
                className="popup__input popup__input_user_job"
                name="about"
                placeholder="Род деятельности"
                required
                minLength="2"
                maxLength="200"
                onChange={handleChangeDescription}
                value={description || ""}
            />
            <span className="popup__form-error popup__form-error-about"></span>
        </PopupWithForm>
    );
}
