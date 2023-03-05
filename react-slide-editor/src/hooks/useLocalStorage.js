import { useEffect, useMemo, useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  const storedValue = useMemo(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  }, [initialValue, key]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [storedValue, setValue];
}

export default useLocalStorage;
