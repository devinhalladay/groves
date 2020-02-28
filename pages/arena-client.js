import axios from 'axios'

export default class ArenaClient {
    constructor(accessToken) {
      this.accessToken = accessToken;
      this.ArenaQuery = axios.create({
        baseURL: 'https://api.are.na/v2',
        headers: {"authorization": `Bearer ${accessToken}`}
      });
    }

    // Make an API request to Are.na, returning the axios promise.
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
      let channelsArray = []
      let amountPerPage = 100;
      let initialPage = 1;

      return new Promise(async (resolve, reject) => {
        await this._makeRequest('get', `/users/${this.me.id}/channels?per=${amountPerPage}&page=${initialPage}`).then(async resp => {
          if (resp.data.total_pages === 1) {
            return resp.data.channels;
          } else {
            channelsArray.push(...resp.data.channels);          
  
            for (let i = initialPage + 1; i <= resp.data.total_pages; i++) {
              await this._makeRequest('get', `/users/${this.me.id}/channels?per=${amountPerPage}&page=${i}`).then(resp => {
                channelsArray.push(...resp.data.channels);
              })
            }
  
            resolve(channelsArray);
          }
        });
      })
    }

    async getBlocksFromChannel(channelID) {
      let blocksArray = [];
      let amountPerPage = 100;
      let initialPage = 1;

      return new Promise(async (resolve, reject) => {
        await this._makeRequest('get', `/v2/channels/${channelID}?per=${amountPerPage}&page=${initialPage}`).then(async resp => {
          if (resp.data.total_pages === 1) {
            return resp.data.contents
          } else {
            blocksArray.push(...resp.data.contents)

            for (let i = initialPage + 1; i <= resp.data.total_pages; i++) {
              await this._makeRequest('get', `/v2/channels/${channelID}?per=${amountPerPage}&page=${initialPage}`).then(resp => {
                channelsArray.push(...resp.data.contents)
              })
            }
          }
        })
      })
    }
  }