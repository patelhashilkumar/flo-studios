import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Standard browser scroll reset
    window.scrollTo(0, 0);
    
    // If Lenis is being used anywhere, we should also try to reset it,
    // though the most reliable way is just to reset window scroll
    // before the next frame.
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [pathname]);

  return null;
}
