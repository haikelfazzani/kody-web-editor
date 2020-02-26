import React, { useContext } from 'react';
import Select from '../components/Select';
import KodyContext from '../providers/KodyContext';
import '../styles/Settings.css';

const fontSizes = ['10', '12', '14', '16', '18', '20', '22', '24'];
const themes = ['ayu_dark', 'dracula', 'cobalt', 'monokai', 'material', 'vs_dark'];

export default function Modal () {

  const { state, setState } = useContext(KodyContext);

  const onFontSize = (e) => {
    let editorSettings = { ...state.editorSettings, fontSize: +e.target.value };
    setState({ ...state, editorSettings });
  }

  const onThemes = (e) => {
    let editorSettings = { ...state.editorSettings, theme: e.target.value };
    setState({ ...state, editorSettings });
  }

  const onSettings = (e) => {
    let editorSettings = { ...state.editorSettings };
    editorSettings[e.target.name] = e.target.checked;

    setState({
      ...state,
      runcode: e.target.name === 'live' ? e.target.checked : state.runcode,
      editorSettings
    });
  }

  const hideModal = () => {
    setState({ ...state, showSettingsModal: false });
  }

  return (<div className="modal" style={{ display: state.showSettingsModal ? 'flex' : 'none' }}>
    <div className="modal-content ">

      <div className="d-flex-sp border-bottom mb-20">
        <h4 className="m-0 cl-blue-sky"><i className="fas fa-cog"></i> settings</h4>
        <small onClick={hideModal} className="btn-close-modal">&#10005;</small>
      </div>

      <div className="d-flex">
        <input type="checkbox"
          onChange={onSettings}
          checked={state.editorSettings.live}
          className="mr-10"
          name="live"
        />
        <label htmlFor="live">Update output in realtime while coding</label>
      </div>
      <p className="mt-0 fs-12">If not checked, Run button will appear to manually run the code</p>

      <div className="d-flex mb-10 border-top">
        <input type="checkbox"
          onChange={onSettings}
          checked={state.editorSettings.showPrintMargin}
          className="mr-10"
          name="showPrintMargin"
        />
        <label htmlFor="showPrintMargin">Show Print Margin</label>
      </div>

      <div className="d-flex mb-10">
        <input type="checkbox"
          onChange={onSettings}
          checked={state.editorSettings.wrapEnabled}
          className="mr-10"
          name="wrapEnabled"
        />
        <label htmlFor="wrapEnabled">Wrap Enabled</label>
      </div>

      <div className="d-flex mb-10">
        <input type="checkbox"
          onChange={onSettings}
          checked={state.editorSettings.enableLiveAutocompletion}
          className="mr-10"
          name="enableLiveAutocompletion"
        />
        <label htmlFor="enableLiveAutocompletion">Enable Live Autocompletion</label>
      </div>

      <div className="mb-10">
        <label htmlFor="fontsize">Font Size ({state.editorSettings.fontSize})</label>
        <Select onChange={onFontSize} data={fontSizes} clx="mt-5" />
      </div>

      <div>
        <label htmlFor="themes">themes ({state.editorSettings.theme})</label>
        <Select onChange={onThemes} data={themes} clx="mt-5" />
      </div>

    </div>
  </div>);
}