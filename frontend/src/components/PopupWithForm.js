import React from "react";

export default function PopupWithForm({
    name,
    title,
    isOpen,
    children,
    button,
    onClose,
    onSubmit,
    isLoading
}) {
    return (
        <section
            className={`popup popup_type_${name} ${
                isOpen ? "popup_opened" : ""
            }`}
        >
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close"
                    onClick={onClose}
                ></button>
                <h2 className="popup__title">{title}</h2>
                <form name={name} className="popup__form" onSubmit={onSubmit}>
                    {children}
                    <button
                        disabled={isLoading}
                        className="popup__button popup__button_edit"
                        type="submit"
                    >
                        {button}
                    </button>
                </form>
            </div>
        </section>
    );
}
