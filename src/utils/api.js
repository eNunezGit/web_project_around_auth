class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
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
            headers: this._headers,
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
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "b100bf75-a46c-483c-9b28-27beb1ac7303",
        "Content-Type": "application/json"
    }
});

export default api;