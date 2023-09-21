export default function InfoTooltip({ isOpen, onClose, image, title }) {
    return (
        <section
            className={`popup ${isOpen ? "popup_opened" : ""}`}
            onClick={onClose}
        >
            <div className="popup__tooltip">
                <img src={image} alt={title} className="popup__tooltip-image" />
                <figcaption className="popup__tooltip-caption">
                    {title}
                </figcaption>
                <button
                    type="button"
                    className="popup__close"
                    onClick={onClose}
                ></button>
            </div>
        </section>
    );
}
