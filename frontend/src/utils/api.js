class Api {
    constructor({url}) {
        this._url = url;
        // this._headers = apiConfig.headers;
    }

    getInitialCardsApi() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        }).then((res) => this._checkError(res));
    }

    getUserInfoApi() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        }).then((res) => this._checkError(res));
    }

    addCardElements(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link, }),
        }).then((res) => this._checkError(res));
    }

    editProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            credentials: this._credentails,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then((res) => this._checkError(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        }).then((res) => this._checkError(res));
    }

    editProfileAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify({avatar: data.avatar,}),
        }).then((res) => this._checkError(res));
    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: `${!isLiked ? "DELETE" : "PUT"}`,
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            credentials: "include",
        }).then((res) => this._checkError(res));
    }
}

export const api = new Api({
    url: "https://api.domainname.anna.nomoredomainsrocks.ru"
});

