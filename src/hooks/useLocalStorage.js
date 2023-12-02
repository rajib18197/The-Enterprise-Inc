import { useEffect, useState } from "react";

export function useLocalStorage(key, initialState) {
  const [value, setValue] = useState(() => {
    const storage = localStorage.getItem(key);
    console.log(storage);
    if (storage) return JSON.parse(storage);
    return initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
