import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function EditProfilePopup({
    isOpen,
    onClose,
    onAddPlace,
    isLoading,
}) {
    const [namePlace, setNamePlace] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: namePlace,
            link: link,
        });
    }

    function handleChangePlaceName(e) {
        setNamePlace(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    React.useEffect(() => {
        setNamePlace("");
        setLink("");
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            name={"add-place"}
            title={"Новое место"}
            button={"Создать"}
            onSubmit={handleSubmit}
            buttonLoading={isLoading ? "Загрузка..." : "Сохранить"}
        >
            <input
                id="textInput"
                type="text"
                className="popup__input  popup__input_mesto_title"
                name="title"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
                onChange={handleChangePlaceName}
            />
            <span className="popup__form-error popup__form-error-title"></span>
            <input
                id="imageInput"
                type="url"
                className="popup__input popup__input_mesto_image"
                name="image"
                placeholder="Ссылка на картинку"
                required
                onChange={handleChangeLink}
            />
            <span className="popup__form-error popup__form-error-image"></span>
        </PopupWithForm>
    );
}
