import axios from 'axios';

export default class SnippetService {

  static async getSnippets () {
    let snippets = await axios.get('https://api.jsonbin.io/b/5e9f66352940c704e1dc49d6/latest')
    return snippets.data;
  }

  static async getSnippet (hookName) {
    let snippets = await this.getSnippets();
    let urlSnippet = snippets.find(e => e.hook === hookName).url;

    let snippet = await axios.get(urlSnippet)
    return snippet.data;
  }

}