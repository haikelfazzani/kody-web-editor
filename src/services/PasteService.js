import axios from 'axios';
import { DropboxService } from './DropboxService';

const PROX_SERVER = 'https://api.allorigins.win/get?url=';

export default class PasteService {

  static async getContent (service, fileId) {
    try {
      if (service === 'hastebin') {
        let resp = await axios(PROX_SERVER + 'https://hastebin.com/documents/' + fileId);
        resp = JSON.parse(resp.data.contents).data;
        return window.decodeURIComponent(resp);
      }
      if (service === 'pastebin') {
        let resp = await axios(PROX_SERVER + 'https://pastebin.com/raw/' + fileId);
        return resp.data.contents;
      }
      if (service === 'dropbox') {
        let resp = await DropboxService.downloadFile(fileId);
        return resp;
      }
    } catch (error) {
      return '';
    }
  }

  static async savePaste (service, data) {
    let resp = null;
    if (service === 'pastebin') {
      resp = await this.savePasteBin(data);
      return resp;
    }

    if (service === 'hastebin') {
      resp = await this.saveHasteBin(data);
      return resp;
    }

    if (service === 'dropbox') {
      resp = await DropboxService.uploadFile(data.filename, data.code);
      return 'https://www.dropbox.com/home?preview=' + resp.name
    }
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
          format: 'html5'
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