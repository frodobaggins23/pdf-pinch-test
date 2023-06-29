import { useState, useEffect } from 'react';

type BreakpointType = 'sm' | 'md' | 'lg' | 'xl';

export function useWidth(): [BreakpointType,number] {
  const [breakPoint, setBreakpoint] = useState<BreakpointType>('xl');
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 576) {
        setBreakpoint('sm');
      } else if (windowWidth < 768) {
        setBreakpoint('md');
      } else if (windowWidth < 992) {
        setBreakpoint('lg');
      } else {
        setBreakpoint('xl');
      }
      setWidth(windowWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return [breakPoint,width];
}

600-64 