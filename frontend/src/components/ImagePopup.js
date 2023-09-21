import React from "react";

export default function ImagePopup({ card, onClose }) {
    return (
        <section className={`popup popup_type_image ${card && "popup_opened"}`}>
            <div className="popup__images">
                <figure className="popup__figure">
                    <img
                        src={card?.link}
                        alt={card?.name}
                        className="popup__image"
                    />
                    <figcaption className="popup__img-caption">
                        {card?.name}
                    </figcaption>
                </figure>
                <button
                    className="popup__close popup__close_button_image"
                    type="button"
                    onClick={onClose}
                />
            </div>
        </section>
    );
}
