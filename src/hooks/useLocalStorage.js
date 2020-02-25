import { useState, useEffect } from 'react';

export default function useLocalStorage (name, value) {

  const [state, setState] = useState(() => {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name));
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(value));
  }, [name, value]);

  return { state, setState };
}