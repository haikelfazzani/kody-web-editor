import { useState } from 'react'
import CDNService from '../../../services/CDNService';
import debounce from '../../../util/debounce';
import LocalExternalLibs from '../../../util/LocalExternalLibs';

export default function AddLib() {
  const [libs, setLibs] = useState(LocalExternalLibs.getAll())
  const [suggestions, setSuggestions] = useState()

  const onchange = debounce(async e => {
    const url = await CDNService.search(e.target.value);
    setSuggestions(url);
  });

  const onRemove = lib => {
    if (window.confirm('Remove? ' + lib.name)) setLibs(LocalExternalLibs.removeOne(lib))
  }

  const onAdd = lib => {
    if (!libs.find(l => l.latest === lib.latest)) setLibs(LocalExternalLibs.addOne(lib))
  }

  return (<div className='w-100'>

    <div className='w-100 d-flex'>      
      <input className='w-100 br7' type="text" name='library' onChange={onchange} placeholder='type name library..' required />
    </div>

    <hr />

    <ul className='h-25 grid-2 overflow-auto pr-1'>
      {suggestions
        ? suggestions.map((sug, i) => <li
          className='w-100 d-flex justify-between align-center' key={i}>
          <h4 className='m-0'>{sug.name} ({sug.version})</h4>
          <button className='cp mr-1 white' onClick={() => { onAdd(sug) }}><i className='fa fa-plus-circle'></i></button>
        </li>)
        : <li className='gray'>Seach result..</li>}
    </ul>

    <hr />

    <ul className='h-25 grid-2 overflow-auto pr-1'>
      {libs && libs.map((sug, i) => <li
        className='w-100 d-flex justify-between align-center' key={i}>
        <h4 className='m-0'>{sug.name} ({sug.version})</h4>
        <button className='cp red' onClick={() => { onRemove(sug) }}><i className='fa fa-trash'></i></button>
      </li>)}
    </ul>
  </div>)
}
