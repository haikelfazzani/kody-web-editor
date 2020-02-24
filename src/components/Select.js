import React from 'react';

export default function Select ({ onChange, data }) {
  return <select onChange={onChange}>
    {data && data.map(d => <option value={d} key={d}>{d}</option>)}
  </select>;
}