export const BASE_URL = "https://auth.nomoreparties.co";

export function register(email, password) {
    console.log(password, email);
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            password: password,
            email: email,
        }),
    }).then((res) => checkError(res));
}

export function authorize(password, email) {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            password: password,
            email: email,
        }),
    }).then((res) => checkError(res));
}

export function getContent(jwt) {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
    }).then((res) => checkError(res));
}

function checkError(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`${res.status}`);
}
