import { useCallback } from 'react'
import download from '../../../util/download';
import tabsToHTML from '../../../util/tabsToHTML';

export default function DownloadButton() {
  const onDownload = useCallback(() => {
    const tabs = JSON.parse(localStorage.getItem('tabs'));
    const html = tabsToHTML(tabs);
    download(html, 'kody.html');
  }
    , [])
  return (
    <button className='white' onClick={onDownload}><i className="fa fa-download"></i></button>
  )
}
