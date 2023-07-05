import { BASE_URL } from "./constants";

class Auth {
  constructor(url) {
    this.url = url;
  }

  _checkResopne(res) {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(inputsValue) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputsValue),
    }).then((res) => this._checkResopne(res));
  }

  authorization(inputsValues) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputsValues),
    }).then((res) => this._checkResopne(res));
  }

  checkToken(jwt) {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${jwt}`,
      }
    }).then((res) => this._checkResopne(res));
  }
}

const auth = new Auth(BASE_URL);

export default auth;