import React from "react";
import logo from "../images/logo.svg";
import { useLocation, Link } from "react-router-dom";

export default function Header({email, signOut}) {
    const { pathname } = useLocation();
    return (
        <header className="header">
            <img
                src={logo}
                alt="Логотип сайта Место"
                className="header__logo"
            />
            {pathname === "/signin" && (
                <div className="header__information">
                    <Link to="/signup" className="header__link">
                        Регистрация
                    </Link>
                </div>
            )}
            {pathname === "/signup" && (
                <div className="header__information">
                    <Link to="/signin" className="header__link">
                        Войти
                    </Link>
                </div>
            )}
            {pathname === "/" && (
                <div className="header__information">
                    <p className="header__email">{email}</p>
                    <Link
                        to="/signin"
                        className="header__link"
                        onClick={signOut}
                    >
                        Выйти
                    </Link>
                </div>
            )}
        </header>
    );
}
