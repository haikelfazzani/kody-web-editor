import axios from 'axios';

const isDev = true;

const KODY_DROPBOX_TOKEN = 'kody-dropbox-token';
const DROPBOX_API_BASE_URL = 'https://api.dropboxapi.com/2/';
const redirect_uri = isDev ? 'http://localhost:3000/auth' : 'https://kody.now.sh/auth';

export class DropboxAuth {
  static login () {
    const url = `https://www.dropbox.com/oauth2/authorize?client_id=${process.env.REACT_APP_DROPBOX_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=token`;
    window.location.href = url;
  }

  static logout () {
    localStorage.removeItem(KODY_DROPBOX_TOKEN);
    window.location.reload();
  }

  static getToken () {
    return localStorage.getItem(KODY_DROPBOX_TOKEN) || null;
  }

  // http://host/auth#access_token={access_token}&token_type={bearer}&uid=819193712&account_id={account_id}
  static setToken () {
    let token = window.location.href.match(/(?<=access_token=)(.*?)(?=&)/gi)[0];

    try {
      if (token && token.length > 15) {
        localStorage.setItem(KODY_DROPBOX_TOKEN, token);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  static clearToken () {
    return localStorage.removeItem(KODY_DROPBOX_TOKEN);
  }
}

export class DropboxService {

  static init() {
    return new window.Dropbox.Dropbox({ fetch: window.fetch, accessToken: DropboxAuth.getToken() });
  }

  static async userAccount () {
    try {
      const dbx = this.init();
      let response = await dbx.usersGetCurrentAccount();
      return response;
    } catch (error) {
      DropboxAuth.clearToken();
      return null;
    }
  }

  static async downloadFile (file) {
    try {
      const dbx = this.init();
      let response = await dbx.filesDownload({ path: '/' + file });
      return response;
    } catch (error) {
      return null;
    }
  }

  static async uploadFile (filename, fileContent) {
    try {
      const dbx = this.init();

      let file = new File([fileContent], filename + ".html", { type: "text/html" });      
      let response = await dbx.filesUpload({ path: '/' + filename + ".html", contents: file });
      return response;
    } catch (error) {
      return null;
    }
  }

  static async createFolder () {
    try {
      const url = DROPBOX_API_BASE_URL + 'files/create_folder_v2';
      let resp = await axios({
        method: 'POST',
        url,
        headers: {
          "Authorization": "Bearer " + DropboxAuth.getToken(),
          "Content-Type": "application/json"
        },
        data: {
          "path": "/math",
          "autorename": false
        }
      });

      return resp.data;
    } catch (error) {
      return error.message;
    }
  }

  static async getFiles () {
    try {
      const url = DROPBOX_API_BASE_URL + 'files/list_folder';
      let resp = await axios({
        method: 'POST',
        url,
        headers: {
          "Authorization": "Bearer " + DropboxAuth.getToken(),
          "Content-Type": "application/json"
        },
        data: {
          "path": "",
          "recursive": false,
          "include_media_info": false,
          "include_deleted": false,
          "include_has_explicit_shared_members": false,
          "include_mounted_folders": true,
          "include_non_downloadable_files": true
        }
      });

      let files = resp.data.entries
        .filter(f => f['.tag'] === 'file' && f.is_downloadable && /\.(txt|html)$/i.test(f.name));

      return files;
    } catch (error) {
      return null;
    }
  }
}