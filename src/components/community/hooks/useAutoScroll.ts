import { useEffect, useRef } from 'react';

export function useAutoScroll<T extends HTMLElement>(deps: any[]) {
  const bottomRef = useRef<T>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, deps);

  return bottomRef;
}
