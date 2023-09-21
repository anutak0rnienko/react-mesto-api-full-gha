import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like ${
        isLiked && "element__like_active"
    }`;

    const handleCardClick = () => onCardClick(card);
    const handleLikeClick = () => onCardLike(card);
    const handleDeleteClick = () => onCardDelete(card);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <article className="element">
                <img
                    src={card.link}
                    alt={card.name}
                    className="element__image"
                    onClick={handleCardClick}
                />
                <div className="element__info">
                    <h2 className="element__text">{card.name}</h2>
                    {isOwn && (
                        <button
                            className="element__delete"
                            onClick={handleDeleteClick}
                        ></button>
                    )}
                    <div className="element__like-container">
                        <button
                            className={cardLikeButtonClassName}
                            type="button"
                            onClick={handleLikeClick}
                        ></button>
                        <p className="element__numberlike">
                            {card.likes.length}
                        </p>
                    </div>
                </div>
            </article>
        </CurrentUserContext.Provider>
    );
}
