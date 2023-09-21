import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar,
    isLoading,
}) {
    const avatarInfo = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarInfo.current.value,
        });
    }

    function handleChangeAvatar() {
        return avatarInfo.current.value;
    }

    React.useEffect(() => {
        avatarInfo.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            name={"avatar"}
            title={"Обновить аватар"}
            button={"Сохранить"}
            onSubmit={handleSubmit}
            buttonLoading={isLoading ? "Загрузка..." : "Сохранить"}
        >
            <input
                id="avatar"
                type="url"
                className="popup__input popup__input_type_avatar"
                name="avatar"
                placeholder="Ссылка на аватар"
                required
                minLength="2"
                onChange={handleChangeAvatar}
                ref={avatarInfo}
            />
            <span className="popup__form-error popup__form-error-avatar"></span>
        </PopupWithForm>
    );
}
