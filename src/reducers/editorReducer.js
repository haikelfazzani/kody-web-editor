import LocalData from "../util/LocalData";
import UrlShortnerService from "../services/UrlShortnerService";
import copyToClipboard from "../util/copyToClipboard";

const editorInitState = {
  code: null,
  isCopied: false,
  isEmbedCopied: false
}

export default function editorReducer (state, event, exec) {
  switch (event.type) {

    case 'COPY_EMBED_CODE':
      exec(async () => {
        let codeResult = LocalData.getTabs();

        const encodedData = window.btoa(JSON.stringify(codeResult));
        let url = window.location.origin + '/react-playground?r=' + encodedData;

        url = `<iframe src="${url}" title="reacto" width="500" height="500"></iframe>`;

        copyToClipboard(url);
      });

      return { ...state, isEmbedCopied: true };

    case 'DOWNLOAD_CODE':
      const dType = 'data:text/plain;charset=utf-8,';
      let codeResult = LocalData.getTabs().reduce((a, c) => c.code + '\n' + a, '');

      return { ...state, code: dType + encodeURIComponent(codeResult) };

    case 'COPY_LINK':
      exec(async () => {
        let codeResult = LocalData.getTabs();
        
        const encodedData = window.btoa(JSON.stringify(codeResult));
        let url = window.location.origin + '/react-playground?r=' + encodedData;

        let shortUrl = await UrlShortnerService.getShortLink(url);

        copyToClipboard(shortUrl);
      });

      return { ...state, isCopied: true };

    case 'IS_EMBED_COPIED':
      return { ...state, isEmbedCopied: false };

    case 'IS_COPIED':
      return { ...state, isCopied: false };

    default:
      return state;
  }
};

export { editorReducer, editorInitState };