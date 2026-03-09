import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Also scroll the main container if it has overflow
    const main = document.querySelector('main');
    if (main) {
      main.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
