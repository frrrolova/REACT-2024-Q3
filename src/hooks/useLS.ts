import { useState } from 'react';

export function useLS(key: string) {
  const [state, setState] = useState<string | null>(localStorage.getItem(key));

  return [
    state,
    (value: string) => {
      setState(value);
      localStorage.setItem(key, value);
    },
  ] as [string | null, (value: string) => void];
}
