import React, { useEffect, useState } from 'react';

// Zero-dependency hash router. Swap for react-router later without touching pages (they only use <Link/> and go()).
const read = () => window.location.hash.replace(/^#/, '') || '/';
export const go = (to: string) => { window.location.hash = to; };

export function useRoute() {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => setRoute(read());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export function Link({ to, ...p }: { to: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a href={`#${to}`} {...p} />;
}
