class Api {
    constructor(apiConfig) {
        this._url = apiConfig.url;
        this._headers = apiConfig.headers;
    }

    getInitialCardsApi() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._checkError(res));
    }

    getUserInfoApi() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._checkError(res));
    }

    addCardElements(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data),
        }).then((res) => this._checkError(res));
    }

    editProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then((res) => this._checkError(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this._checkError(res));
    }

    editProfileAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data),
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
            headers: this._headers,
        }).then((res) => this._checkError(res));
    }
}

const api = new Api({
    // url: "https://mesto.nomoreparties.co/v1/cohort-65",
    url: "https://api.domainname.anna.nomoredomainsrocks.ru",
    headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("jwt"),
    },
});

export default api;
