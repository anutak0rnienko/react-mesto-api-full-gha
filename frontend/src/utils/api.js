class Api {
  constructor(options) {
    this._url = options.url
  }

  getInitialCardsApi() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._checkError(res))
  }

  getUserInfoApi() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._checkError(res))
  }

  addCardElements(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkError(res))
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkError(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._checkError(res))
  }

  editProfileAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkError(res))
  }

  _checkError(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  /*changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${!isLiked ? "DELETE" : "PUT"}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._checkError(res))
  }
}*/

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._checkError(res))
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._checkError(res))
  }
}

const api = new Api({
   url: "https://api.domainname.anna.nomoredomainsrocks.ru",
  // url: "http://localhost:3000",
})

export default api
