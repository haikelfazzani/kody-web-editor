import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Editor from '../containers/Editor';
import { withRouter, useParams } from 'react-router-dom';
import PastebinService from '../services/PastebinService';

function Playground () {

  let { id } = useParams();
  const [paste, setPaste] = useState(null);

  useEffect(() => {
    if (id) {
      PastebinService.getPaste(id)
        .then(paste => {
          setPaste(paste);
        });
    }
  }, [id]);

  return (<main className="h-100 w-100">
    <Sidebar />
    <Editor pasteContent={paste} />
  </main>);
}

export default withRouter(Playground);