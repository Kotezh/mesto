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
  
  setUserInfo(data) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    })
      .then((res) => this._parseResponse(res))
      .catch((msg) => Promise.reject(new Error(msg)));
  }

  setNewAvatar({ avatar }) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) => this._parseResponse(res))
      .catch((msg) => Promise.reject(new Error(msg)));
  }

  addNewCard({ name, link }) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        link
      }),
    })
      .then((res) => this._parseResponse(res))
      .catch((msg) => Promise.reject(new Error(msg)));
  }

  deleteCard(_id) {
    return fetch(`${this.url}/cards/${_id}`, {
      method: "DELETE",
      headers: this.headers
    })
      .then((res) => this._parseResponse(res))
      .catch((msg) => Promise.reject(new Error(msg)));
  }

  addLike(_id) {
    return fetch(`${this.url}/cards/likes/${_id}`, {
      method: "PUT",
      headers: this.headers
    })
      .then((res) => this._parseResponse(res))
      .catch((msg) => Promise.reject(new Error(msg)));
  }

  deleteLike(_id) {
    return fetch(`${this.url}/cards/likes/${_id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => this._parseResponse(res))
      .catch((msg) => Promise.reject(new Error(msg)));
  }

}
