const KODY_DROPBOX_TOKEN = 'kody-dropbox-token';
const redirect_uri = "https://kody.cf/auth";
const client_id = process.env.REACT_APP_DROPBOX_CLIENT_ID;

export class AuthService {
  static login () {
    const url = `https://www.dropbox.com/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token`;
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