import axios from "axios";

export default class ArenaClient {
  constructor(accessToken) {
    this.accessToken = accessToken || false;
    this.ArenaQuery = axios.create({
      baseURL: "https://api.are.na/v2",
      headers: { authorization: `Bearer ${accessToken}` },
    });
  }

  // Make an API request to Are.na, returning the axios promise.
  _makeRequest(method, path, body = {}) {
    return this.ArenaQuery[method](`${path}`, {
      body: body,
    });
  }

  setMe(me) {
    this.me = me;
    return Promise.resolve(this.me);
  }

  getMe() {
    return this._makeRequest("get", `/me`).then((resp) => {
      this.setMe(resp.data);
      return resp.data;
    });
  }
}
