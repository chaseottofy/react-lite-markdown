import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedVal(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]
  );
  return debouncedVal;
}