import unquer from "unquer";
import templates from '../util/templates';
import Preprocessor from '../util/Preprocessor';

const { service, file } = unquer.parse(window.location.search);

const initState =// localStorage.getItem('config-v2')
//? JSON.parse(localStorage.getItem('config-v2'))
{
  template: 'vanilla',
  tabIndex: 0,
  showConsole: true,
  logs: '',
  service,
  file
};

initState.template = 'local';

export default initState