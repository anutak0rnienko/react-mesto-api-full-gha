export const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

export const validationConfig = {
    formSelector: "form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_form_invalid",
};

export const nameInput = document.querySelector(".popup__input_user_name");
export const jobInput = document.querySelector(".popup__input_user_job");
export const popupEditOpen = document.querySelector(".profile__edit-button");
export const popupBtnAdd = document.querySelector(".profile__add-button");
export const popupAvatarButton = document.querySelector(
    ".profile__avatar-button"
);
export const cardForm = document.forms["card-form"];
export const profileForm = document.forms["form"];
export const avatarForm = document.forms["form-avatar"];
export const deleteForm = document.querySelector(".popup_type_delete");

export const apiConfig = {
    url: "https://mesto.nomoreparties.co/v1/cohort-65",
    headers: {
        "Content-Type": "application/json",
        authorization: "a78ff19e-0d6f-4d15-9950-0c2176ee362c",
    },
};
