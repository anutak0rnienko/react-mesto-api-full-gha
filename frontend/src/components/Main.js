import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

export default function Main({
    cards,
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    onCardDelete,
    onCardLike,
}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main-content">
            <section className="profile">
                <div className="profile__avatar">
                    <img
                        src={currentUser.avatar}
                        alt="#"
                        className="profile__avatar-image"
                    />
                    <button
                        type="button"
                        className="profile__avatar-button"
                        onClick={() => {
                            onEditAvatar(true);
                        }}
                    ></button>
                </div>
                <article className="profile__info">
                    <div className="profile__info-name">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            type="button"
                            className="profile__edit-button"
                            onClick={() => {
                                onEditProfile(true);
                            }}
                        ></button>
                    </div>
                    <p className="profile__text">{currentUser.about}</p>
                </article>
                <button
                    type="button"
                    className="profile__add-button"
                    onClick={() => {
                        onAddPlace(true);
                    }}
                ></button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        card={card}
                        key={card._id}
                        likes={card.likes}
                        name={card.name}
                        link={card.link}
                        owner={card.owner}
                        onCardClick={onCardClick}
                        onCardDelete={onCardDelete}
                        onCardLike={onCardLike}
                    />
                ))}
            </section>
        </main>
    );
}
