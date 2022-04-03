import loadTheme from "../util/loadTheme";

export default function PlaygroundReducer(state, action) {
  switch (action.type) {
    case 'tab-index': {
      const newState = { ...state, tabIndex: action.payload.tabIndex }
      localStorage.setItem('config', JSON.stringify(newState))
      return newState;
    }

    case 'language': {
      const newState = { ...state, languages: action.payload };
      localStorage.setItem('config', JSON.stringify(newState));
      return newState
    }

    case 'template': {
      const template = action.payload.template;
      const newState = { ...state, template };
      localStorage.setItem('config', JSON.stringify(newState));
      return newState
    }

    case 'fontSize': {
      const newState = { ...state, fontSize: action.payload.fontSize };
      localStorage.setItem('config', JSON.stringify(newState))
      return newState
    }

    case 'theme': {
      const theme = action.payload.theme;
      loadTheme(theme)
      document.documentElement.setAttribute('data-theme', theme);
      const newState = { ...state, theme };
      localStorage.setItem('config', JSON.stringify(newState))
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

    default: {
      return state
    }
  }
}