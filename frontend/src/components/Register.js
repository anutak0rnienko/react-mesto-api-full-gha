import React from "react";
import { Link } from "react-router-dom";

export default function Login({ onRegister }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email, password);
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form
                name="register"
                className="auth__form"
                onSubmit={handleSubmit}
            >
                <input
                    className="auth__input auth__input_email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleEmail}
                    value={email || ""}
                />
                <input
                    type="password"
                    className="auth__input auth__input_password"
                    name="password"
                    placeholder="Пароль"
                    required
                    onChange={handlePassword}
                    value={password || ""}
                />
                <button className="auth__button" type="submit">
                    Зарегистрироваться
                </button>
                <Link className="auth__link" to="signin">
                    Уже зарегистрированы? Войти
                </Link>
            </form>
        </div>
    );
}
