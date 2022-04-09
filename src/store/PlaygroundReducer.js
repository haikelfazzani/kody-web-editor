import loadTheme from "../util/loadTheme";

export default function PlaygroundReducer(state, action) {
  switch (action.type) {
    case 'tab-index': {
      const newState = { ...state, tabIndex: action.payload.tabIndex }
      localStorage.setItem('config-v2', JSON.stringify(newState))
      return newState;
    }

    case 'language': {
      const newState = { ...state, languages: action.payload };
      localStorage.setItem('config-v2', JSON.stringify(newState));
      return newState
    }

    case 'template': {
      const template = action.payload.template;
      const newState = { ...state, template };
      localStorage.setItem('config-v2', JSON.stringify(newState));
      return newState
    }

    case 'editor-options': {
      if (action.payload.theme !== state.editorOptions.theme) {
        loadTheme(action.payload.theme)
        document.documentElement.setAttribute('data-theme', action.payload.theme);
      }

      const newState = { ...state, editorOptions: action.payload };      
      localStorage.setItem('config-v2', JSON.stringify(newState))
      return newState
    }

    case 'share-url': {
      let code = localStorage.getItem('editorValue') || '';
      code = encodeURIComponent(btoa(code));
      const url = `${window.location.href}?language=${state.language.name}&code=${code}`;
      window.location.href.replace(url)
      //copy(url);

      return { ...state, message: url, showSnackbar: true }
    }

    case 'show-console': {
      const newState = { ...state, showConsole: !state.showConsole };
      localStorage.setItem('config-v2', JSON.stringify(newState))
      return newState
    }

    case 'console-logs': {
      const logs = action.payload.logs;
      const newState = { ...state, logs };
      localStorage.setItem('config-v2', JSON.stringify(newState))
      return newState
    }

    default: {
      return state
    }
  }
}