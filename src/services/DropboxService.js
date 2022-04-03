import axios from 'axios';
import { AuthService } from './AuthService';

let fetch;
try {
  fetch = window.fetch.bind(window);
} catch (e) {
  console.log(e);
}

const DROPBOX_API_BASE_URL = process.env.REACT_APP_DROPBOX_API_BASE_URL;

export class DropboxService {

  static init() {
    return new window.Dropbox.Dropbox({ fetch, accessToken: AuthService.getToken() });
  }

  static async userAccount() {
    const dbx = this.init();
    let response = await dbx.usersGetCurrentAccount();
    return response.result;
  }

  static async downloadFile(file) {
    const dbx = this.init();
    try {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await dbx.filesDownload({ path: '/' + file });
          response = response.result;
          let reader = new FileReader();

          reader.onload = function () {
            if (this.result) {
              resolve(this.result);
            }
          };

          reader.readAsText(response.fileBlob);
        } catch (error) {
          reject(error.message);
        }
      });

    } catch (error) {
      return null;
    }
  }

  static async uploadFile(filename, fileContent) {
    const dbx = this.init();
    let file = new File([fileContent], filename + ".html", { type: "text/html" });
    let response = await dbx.filesUpload({ path: '/' + filename + ".html", contents: file });
    return response.result;
  }

  static async createFolder() {
    try {
      const url = DROPBOX_API_BASE_URL + 'files/create_folder_v2';
      let resp = await axios({
        method: 'POST',
        url,
        headers: {
          "Authorization": "Bearer " + AuthService.getToken(),
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

  static async getFiles() {
    const url = DROPBOX_API_BASE_URL + 'files/list_folder';
    let resp = await axios({
      method: 'POST',
      url,
      headers: {
        "Authorization": "Bearer " + AuthService.getToken(),
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
  }
}