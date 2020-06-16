const BASE_URL = process.env.REACT_APP_PASTEBIN_SERVER;

export default class PastebinService {

  static async login (username, password) {
    let resp = await fetch('https://myboxss.000webhostapp.com/pastebin/login', {
      method: 'POST',
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    });

    resp = await resp.text();

    if (resp === 'Bad API request, invalid api_user_key') {
      throw new Error('Bad API request, invalid api_user_key');
    }

    localStorage.setItem('kody-api-username', username);
    localStorage.setItem('kody-api-key', resp);
    return resp;
  }

  static async getUserInfo () {
    try {
      let resp = await fetch('https://myboxss.000webhostapp.com/pastebin/user', {
        method: 'POST',
        body: JSON.stringify({
          "user_key": this.getApiKey()
        })
      });

      resp = await resp.json();

      if (resp === 'Bad API request, invalid api_user_key') {
        throw new Error('Bad API request, invalid api_user_key');
      }

      return resp;
    } catch (error) {
      return error.message;
    }
  }

  static async createPaste (filename, expireDate) {
    try {
      let resp = await fetch('https://myboxss.000webhostapp.com/pastebin/create', {
        method: 'POST',
        body: JSON.stringify({
          "user_key": this.getApiKey(),
          "code": this.getUserCode(),
          "private": "0",
          "filename": filename + '.html',
          "expire_date": expireDate,
          "format": "html5"
        })
      });

      resp = await resp.text();

      if (resp === 'Bad API request, invalid login') {
        throw new Error('Bad API request, invalid login');
      }

      return resp;
    } catch (error) {
      return error.message;
    }
  }

  static async getPaste (paste_key) {
    let resp = await fetch(BASE_URL + '/pastebin/get?paste_key=' + paste_key);
    resp = await resp.text();
    return resp;
  }

  static async getPastes () {
    try {
      let resp = await fetch('https://myboxss.000webhostapp.com/pastebin/list?api_key=' + this.getApiKey());
      resp = await resp.json();

      if (Array.isArray(resp) && resp[0] === 'Bad API request, invalid api_user_key') {
        throw new Error('Bad API request, invalid api_user_key');
      }

      return resp.paste;
    } catch (error) {
      return error.message;
    }
  }

  static async deletePaste (paste_key) {

    let resp = await fetch(BASE_URL + '/pastebin/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "user_key": this.getApiKey(),
        "paste_key": paste_key
      })
    });

    resp = await resp.text();
    return resp;
  }

  static getApiKey () {
    let key = localStorage.getItem('kody-api-key');
    return key || null;
  }

  static getUsername () {
    let username = localStorage.getItem('kody-api-username');
    return username || null;
  }

  static getUserCode () {
    let local = localStorage.getItem('kody-tabs');
    let temp = 'empty';

    if (local) {
      local = JSON.parse(local);
      temp = `<html>
        <head>
          <style>${local[1]}</style>
        </head>
          <body>${local[0]}
          <script>${local[2]}</script>
        </body>
      </html>`;
      return temp
    }
    return temp;
  }
}