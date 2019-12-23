import axios from 'axios'
import Arena from 'are.na'

export default class Channel {
  create = async (token, slug) => {
    // await axios
    //   .post(`https://api.are.na/v2/me`)
    //   .then(async res => {
    //     // TODO: uhhhh idk - figure this out
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  delete = async (token, slug) => {
    // TODO: decide whether or not to let users delete blocks
  }
}