import axios from 'axios';

export default class UrlShortnerService {

  static async getShortLink (longUrl) {
    try {
      const resp = await axios.get(`https://api.shrtco.de/v2/shorten?url=${longUrl}/very/long/link.html`);
      //return resp.data.result.full_short_link;
      return longUrl
    } catch (error) {
      return longUrl;
    }
  }

}