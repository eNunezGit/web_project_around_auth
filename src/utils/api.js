class Api {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
        this._token = null;
    }

    setToken(token) {
        this._token = token;
    }

    _getHeaders() {
        const headers = { "Content-Type": "application/json" };

        if (this._token) {
            headers.Authorization = `Bearer ${this._token}`;
        }

        return headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(
            new Error(`Error: ${res.status} ${res.statusText}`)
        );
    }

    _request(endpoint, options = {}) {
        return fetch(`${this._baseUrl}${endpoint}`, {
            ...options,
            headers: this._getHeaders(),
        })
        .then(this._checkResponse);
    }

    getUserInfo(){
        return this._request("/users/me", {
            method: "GET",
        });
    }

    getInitialCards() {
        return this._request("/cards", {
            method: "GET"
        });
    }

    changeLikeCardStatus(cardId, isLiked) {
        return this._request(`/cards/${cardId}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
        })
    }

    deleteCard(cardId) {
        return this._request(`/cards/${cardId}`, {
            method: "DELETE",
        })
    }

    updateUserInfo({name, about}) {
        return this._request("/users/me", {
            method: "PATCH",
            body: JSON.stringify({ name, about })
        })
    }

    updateUserAvatar({avatar}) {
        return this._request("/users/me/avatar", {
            method: "PATCH",
            body: JSON.stringify({ avatar })
        })
    }

    addCard({name, link}) {
        return this._request("/cards", {
            method: "POST",
            body: JSON.stringify({ name, link })
        })
    }
}

const api = new Api({
    baseUrl: "https://se-register-api.en.tripleten-services.com/v1",
});

export default api;