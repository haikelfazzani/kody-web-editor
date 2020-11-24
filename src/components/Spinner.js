import React from 'react';
import './Spinner.css';

export default function Spinner () {
  return <div className="spinner-container">
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>;
}