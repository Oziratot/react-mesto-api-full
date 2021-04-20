const serverUrl = 'http://api.mesto-oziratot.space/';

export class Api {
    constructor({ serverUrl }) {
      this._serverUrl = serverUrl;
    }
  
    _getResponseData(res) {
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject(`Ошибка ${res.status}`);
    }
  
    getUserInfo(token) {
      return fetch(`${this._serverUrl}users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(this._getResponseData);
    }
  
    getInitialCards(token) {
      return fetch(`${this._serverUrl}cards`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(this._getResponseData);
    }
  
    setUserInfo(data, token) {
      return fetch(`${this._serverUrl}users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
        .then(this._getResponseData);
    }
  
    addNewCard(data, token) {
      return fetch(`${this._serverUrl}cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
        .then(this._getResponseData);
    }
  
    changeLikeCardStatus(cardId, isLiked, token) {
      return fetch(`${this._serverUrl}cards/likes/${cardId}`, {
        method: (isLiked ? "PUT" : "DELETE"),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(this._getResponseData);
    }
  
    deleteCard(cardId, token) {
      return fetch(`${this._serverUrl}cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(this._getResponseData);
    }
  
    setUserAvatar(link, token) {
      return fetch(`${this._serverUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          avatar: link
        })
      })
        .then(this._getResponseData);
    }
  }

  
  const api = new Api({
      serverUrl: serverUrl,
  })

  export default api