import React from 'react';

export default function Select ({ onChange, data, clx }) {
  return <select onChange={onChange}>
    {data && data.map(d => <option value={d} key={d} className={clx}>{d}</option>)}
  </select>;
}