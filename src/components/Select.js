import React from 'react';

export default function Select ({ onChange, data, clx }) {
  return <select onChange={onChange} className={clx}>
    {data && data.map(d => <option value={d} key={d}>{d}</option>)}
  </select>;
}