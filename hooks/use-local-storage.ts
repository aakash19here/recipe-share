import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initial: T) => {
  const [v, setV] = useState<T>(() => {
    const r = localStorage[key];
    if (r != null) {
      return JSON.parse(r);
    }
    return initial;
  });
  useEffect(() => {
    localStorage[key] = JSON.stringify(v);
  }, [v]);
  return [v, setV] as const;
};
