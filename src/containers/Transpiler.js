import React, { useEffect, useState } from 'react';
import Editor from '../components/Editor';

export default function Transpiler ({ input, codeType }) {

  const [transpiledCode, setTranspiledCode] = useState();

  useEffect(() => {
    let output = '';
    try {
      output = window.Babel.transform(input, {
        envName: 'production', presets: codeType === 'react' ? ['react', 'es2015'] : ['es2015']
      })
      .code;

      setTranspiledCode(output);
    } catch (error) {
      setTranspiledCode(error.message);
    }
  }, [input]);

  return <Editor value={transpiledCode} />;
}