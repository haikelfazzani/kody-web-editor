import axios from 'axios';
import { DropboxService } from './DropboxService';

export default class PasteService {

  static async savePaste (service, data) {
    let resp = null;
    if (service === 'pastebin') {
      resp = await this.savePasteBin(data);
    }
    
    if (service === 'hastebin') {
      resp = await this.saveHasteBin(data);
    }

    if (service === 'dropbox') {
      resp = await DropboxService.uploadFile(data.filename, data.code);
      console.log(resp);
    }
    return resp;
  }

  static async savePasteBin ({ code, filename, expire_date, format }) {
    try {
      let response = await axios({
        url: 'https://myboxss.000webhostapp.com/pastebin/create',
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        data: {
          code: code || "print('hello')",
          filename: (filename || "kody.html"),
          expire_date: expire_date || "1D",
          format:'html5'
        }
      });
      
      return response.data;
    } catch (error) {
      return null;
    }
  }

  static async saveHasteBin ({ code }) {
    try {
      let resp = await axios({
        url: 'https://haikel.pythonanywhere.com/api/hastebin/save',
        method: 'POST',
        data: { data: code || "print('hello')" }
      });

      return resp.data.response;
    } catch (error) {
      return null;
    }
  }
}