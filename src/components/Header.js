import React from 'react';

export default function Header () {
  return (
    <div className="header d-flex justify-content-between dsp-none">
      <div>
        <button className="btn btn-secondary mr-2">Home</button>
        <button className="btn btn-secondary">Home</button>
      </div>

      <div>
        <button className="btn btn-secondary mr-2">Timer</button>
        <button className="btn btn-secondary mr-2">Download</button>
        <button className="btn btn-secondary">Full</button>
      </div>
    </div>
  );
}