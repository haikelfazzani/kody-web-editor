import { useEffect, useState } from "react";

export default function useClickAway (ref) {

  const [isHide, setIsHide] = useState();

  useEffect(() => {
    const handleClick = e => {
      let status = ref.current && ref.current.contains(e.target);
      ref.current.style.display = status ? 'block' : 'none';
      setIsHide(status);
      return;
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);

  return { isHide, setIsHide };
}