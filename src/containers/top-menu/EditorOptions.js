import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import editorOptionsState from '../../atoms/editorOptionsState';

const themes = ['monokai', 'dracula', 'cobalt', 'one_dark', 'ambiance', 'eclipse', 'xcode', 'textmate', 'tomorrow'];

export default function EditorOptions() {

  const [isSaved, setIsSaved] = useState('Save settings');

  const editorOptions = useRecoilValue(editorOptionsState);
  const setOptions = useSetRecoilState(editorOptionsState);

  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    document.documentElement.setAttribute('data-theme', data.theme);

    const newState = (oldValue) => {
      return {
        ...oldValue,
        ...data,
        fontSize: +data.fontSize,
        tabSize: +data.tabSize,
        showPrintMargin: data.showPrintMargin === 'on',
        enableLiveAutocompletion: data.enableLiveAutocompletion === 'on',
        wrapEnabled: data.wrapEnabled === 'on',
        useWorker: data.useWorker === 'on'
      }
    }

    setOptions(newState);
    setIsSaved('Saved');
    localStorage.setItem('editor-options-v3', JSON.stringify(newState()))
    setTimeout(() => { setIsSaved('Save settings'); }, 2000);
  }

  return <form onSubmit={onSubmit}>
    <div className='w-100 d-flex align-center justify-between mb-1'>
      <label htmlFor='fontSize'><i className="fas fa-font mr-1"></i>Font size</label>
      <input type="number" name='fontSize' defaultValue={+editorOptions.fontSize} />
    </div>

    <div className='w-100 d-flex align-center justify-between mb-1'>
      <label htmlFor='tabSize'><i className="fas fa-arrows-alt-h mr-1"></i>tab Size</label>
      <input type="number" name='tabSize' defaultValue={editorOptions.tabSize} />
    </div>

    <div className='w-100 d-flex align-center justify-between mb-1'>
      <label htmlFor='keyboardHandler'><i className="fas fa-keyboard mr-1"></i>Key bindings</label>
      <select name='keyboardHandler' defaultValue={editorOptions.keyboardHandler}>
        <option value="ace/keyboard/sublime">sublime</option>
        <option value="ace/keyboard/vim">vim</option>
        <option value="ace/keyboard/emacs">emacs</option>
        <option value="ace/keyboard/vscode">vscode</option>
      </select>
    </div>

    <div className='w-100 d-flex align-center justify-between'>
      <label htmlFor='theme'><i className="fas fa-fill mr-1"></i>theme</label>
      <select name='theme' defaultValue={editorOptions.theme}>
        {themes.map(theme => <option key={theme} value={theme}>{theme}</option>)}
      </select>
    </div>

    <div className='w-100 d-flex align-center justify-between mt-2'>
      <label htmlFor='wrapEnabled'><i className="fas fa-grip-lines mr-1"></i>Wrap Mode</label>
      <label className="switch">
        <input type="checkbox" name='wrapEnabled' defaultChecked={editorOptions.wrapEnabled} />
        <div></div>
      </label>
    </div>

    <div className='w-100 d-flex align-center justify-between mt-2'>
      <label htmlFor='showPrintMargin'><i className="fas fa-ellipsis-h mr-1"></i>Print Margin</label>
      <label className="switch">
        <input type="checkbox" name='showPrintMargin' defaultChecked={editorOptions.showPrintMargin} />
        <div></div>
      </label>
    </div>    

    <div className='w-100 d-flex align-center justify-between mt-2'>
      <label htmlFor='enableLiveAutocompletion'><i className="fas fa-feather mr-1"></i>Autocompletion</label>
      <label className="switch">
        <input type="checkbox" name='enableLiveAutocompletion' defaultChecked={editorOptions.enableLiveAutocompletion} />
        <div></div>
      </label>
    </div>

    <div className='w-100 d-flex align-center justify-between mt-2'>
      <label htmlFor='useWorker'><i className="fas fa-signature mr-1"></i>SYNTAX CHECKER</label>
      <label className="switch">
        <input type="checkbox" name='useWorker' defaultChecked={editorOptions.useWorker} />
        <div></div>
      </label>
    </div>

    <button className='w-100 btn mt-3' type='submit'><i className='fa fa-save mr-1'></i>{isSaved}</button>
  </form>
}
