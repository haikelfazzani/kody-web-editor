import axios from 'axios';

export default class CDNService {

  static async search (query) {
    try {
      let url = 'https://api.cdnjs.com/libraries?search=' + query + '&fields=version&limit=10';
      let resp = await axios.get(url);
      return resp.data.results
    } catch (error) {

    }
  }
}