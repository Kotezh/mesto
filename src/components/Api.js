export default class Api {
  constructor(config) {
    this.url = config.baseUrl;
    this.headers = config.headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers:  this.headers,
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }
  
  setUserInfo(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    })
      .then((res) => this._parseResponse(res))
      .catch((msg) => Promise.reject(new Error(msg)));
  }

  setNewAvatar( avatar ) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then((res) => this._parseResponse(res))
      .catch((msg) => Promise.reject(new Error(msg)));
  }

  addNewCard( name, link ) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      }),
    })
      .then((res) => this._parseResponse(res))
      .catch((msg) => Promise.reject(new Error(msg)));
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers
    })
      .then((res) => this._parseResponse(res))
      .catch((msg) => Promise.reject(new Error(msg)));
  }

  addLike(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers
    })
      .then((res) => this._parseResponse(res))
      .catch((msg) => Promise.reject(new Error(msg)));
  }

  deleteLike(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => this._parseResponse(res))
      .catch((msg) => Promise.reject(new Error(msg)));
  }

}
