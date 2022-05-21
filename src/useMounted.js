import { useState, useEffect } from 'react';

export default function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

// useBlockIfNotLogin();
// useBlockUnsavedChange(desc);
// useEffectIfLoginUser(callback, deps);
// useLocalStorage(key, initialValue) => [value, setValue];