import axios from 'axios'

export default class ArenaClient {
    constructor(accessToken) {
      this.accessToken = accessToken;
      this.ArenaQuery = axios.create({
        baseURL: 'https://api.are.na/v2',
        headers: {"authorization": `Bearer ${accessToken}`}
      });
    }

    _makeRequest(method, path, body = {}) {
      return this.ArenaQuery[method](`${path}`, {
        body: body
      })
    }

    setMe(me) {
      this.me = me;
      return Promise.resolve(this.me);
    }

    getMe() {
      return this._makeRequest('get', `/me`).then(resp => {
        this.setMe(resp.data)
        return resp.data;
      });
    }

    getChannelsForMe() {
      return this._makeRequest('get', `/users/${this.me.id}/channels`).then(resp => {
        // if (condition) {
          
        // } else {
          
        // }

        return resp.data
      });
    }
  }