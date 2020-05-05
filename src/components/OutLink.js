import React from 'react';

export default function OutLink ({ href, icon }) {
  return (
    <a className="nav-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer">
      <i className={icon}></i>
    </a>
  );
}