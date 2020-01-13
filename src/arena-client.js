import axios from 'axios'

export default class ArenaClient {
    constructor(accessToken) {
      this.accessToken = accessToken;
    }

    _makeRequest(method, path) {
      return axios[method]('https://api.are.na/v2', {
        body: {
          path: path
        }
      })
    }

    setMe(me) {
      this.me = me;
      return Promise.resolve(this.me);
    }

    getMe() {
      return this._makeRequest('get', `/me`).then(resp => {
        return resp.data;
      });
    }

    getChannelsForMe() {
      return this._makeRequest('get', `/users/${this.me.id}/channels`);
    }
  }