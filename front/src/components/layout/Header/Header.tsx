import { FC } from 'react';
import Link from 'next/link';

import Menu from '~/components/layout/navigation/Menu/Menu';

import useScrollLock from '~/hooks/useScrollLock';
import useWindowListener from '~/hooks/useWindowListener';

import Breakpoint from '~/enums/breakpoint.enum';
import Img from '~/components/base/Img/Img';

const Header: FC = () => {
  const { isScrollLocked, setIsScrollLocked } = useScrollLock();
  const breakpoint = Breakpoint.Mobile;

  // Handle unlock scroll
  interface IHandleUnlockScroll {
    (): void;
  }
  const handleUnlockScroll: IHandleUnlockScroll = () => {
    if (isScrollLocked) {
      setIsScrollLocked(false);
    }
  };

  // Handle unlock scroll on breakpoint
  interface IHandleUnlockScrollOnBreakpoint {
    (): void;
  }
  const handleUnlockScrollOnBreakpoint: IHandleUnlockScrollOnBreakpoint = () => {
    const windowWidth = window.innerWidth;
    const isMoreBreakpoint = windowWidth > breakpoint;

    if (isMoreBreakpoint && isScrollLocked) {
      handleUnlockScroll();
    }
  };
  useWindowListener(handleUnlockScrollOnBreakpoint);

  // Handle click
  interface IHandleClick {
    (): void;
  }
  const handleClick: IHandleClick = () => {
    const windowWidth = window.innerWidth;
    const isLessBreakpoint = windowWidth < breakpoint;

    if (isLessBreakpoint) {
      setIsScrollLocked(!isScrollLocked);
    }
  };

  const img = {
    src: '/favicon.svg',
    alt: 'Logo',
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo" onClick={ handleUnlockScroll }>
          <Img className="header" img={ img } resetStyle priority />
          <span>workflow</span>
        </Link>
        <Menu isScrollLocked={ isScrollLocked } onClick={ handleClick } />
      </div>
    </header>
  );
};

export default Header;
