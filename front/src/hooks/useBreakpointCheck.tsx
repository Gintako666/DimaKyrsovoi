import { useState } from 'react';

import useWindowListener from './useWindowListener';

interface IUseBreakpointCheck {
  (breakpoint: number): boolean;
}

const useBreakpointCheck: IUseBreakpointCheck = (breakpoint) => {
  const [ isBreakpoint, setIsBreakpoint ] = useState(false);

  const handleBreakpointCheck = () => {
    const windowWidth = window.innerWidth;
    const isLessBreakpoint = windowWidth < breakpoint;
    setIsBreakpoint(isLessBreakpoint);
  };
  useWindowListener(handleBreakpointCheck);

  return isBreakpoint;
};

export default useBreakpointCheck;
