import React, { useState, useContext } from 'react';
import { PlaygroundContext } from '../../../store/PlaygroundProvider';

const themes = ['monokai', 'dracula', 'cobalt', 'one_dark', 'eclipse', 'xcode', 'tomorrow'];

export default function Settings() {
  const { playgroundState, dispatch } = useContext(PlaygroundContext);
  const { editorOptions } = playgroundState;

  const [isSaved, setIsSaved] = useState('Save settings');

  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    dispatch({
      type: 'editor-options', payload: {
        ...data,
        fontSize: +data.fontSize,
        tabSize: +data.tabSize,
        showInvisibles: data.showInvisibles === 'on',
        enableLiveAutocompletion: data.enableLiveAutocompletion === 'on'
      }
    });

    setIsSaved('Saved');
    setTimeout(() => { setIsSaved('Save settings'); }, 2000);
  }

  return <form onSubmit={onSubmit}>
    <div className='w-100 d-flex align-center justify-between mb-1'>
      <label htmlFor='fontSize'><i className="fas fa-font mr-1"></i>Font size</label>
      <input type="number" name='fontSize' defaultValue={editorOptions.fontSize} />
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
      </select>
    </div>

    <div className='w-100 d-flex align-center justify-between'>
      <label htmlFor='theme'><i className="fas fa-fill mr-1"></i>theme</label>
      <select name='theme' defaultValue={editorOptions.theme}>
        {themes.map(theme => <option key={theme} value={theme}>{theme}</option>)}
      </select>
    </div>

    <div className='w-100 d-flex align-center justify-between mt-2'>
      <label htmlFor='showInvisibles'><i className="fas fa-ellipsis-h mr-1"></i>show Invisibles</label>
      <label className="switch">
        <input type="checkbox" name='showInvisibles' defaultChecked={editorOptions.showInvisibles} />
        <div></div>
      </label>
    </div>

    <div className='w-100 d-flex align-center justify-between mt-2'>
      <label htmlFor='enableLiveAutocompletion'><i className="fas fa-ellipsis-h mr-1"></i>Autocompletion</label>
      <label className="switch">
        <input type="checkbox" name='enableLiveAutocompletion' defaultChecked={editorOptions.enableLiveAutocompletion} />
        <div></div>
      </label>
    </div>

    <button className='w-100 btn mt-3' type='submit'><i className='fa fa-save mr-1'></i>{isSaved}</button>
  </form>
}
