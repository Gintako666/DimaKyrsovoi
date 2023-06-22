import { FC } from 'react';

import Img from '~/components/base/Img/Img';

import handleClassName from '~/utils/className.util';

import links from '~/components/layout/navigation/links/links.const';

import profile from '~/assets/img/profile.jpg';
import Items from './Items/Items';

interface MenuProps {
  isScrollLocked: boolean;
  onClick: () => void;
}

const Menu: FC<MenuProps> = ({ isScrollLocked, onClick }) => {
  const img = {
    src: profile,
    alt: 'Profile',
  };
  return (
    <div className="header__menu menu">
      <button
        type="button"
        className={ handleClassName(isScrollLocked, 'menu__button') }
        onClick={ onClick }
      >
        <span />
      </button>
      <nav className={ handleClassName(isScrollLocked, 'menu__body') }>
        <Items links={ links } onClick={ onClick } />
      </nav>
      <button type="button">
        <Img className="menu" img={ img } />
      </button>
    </div>
  );
};

export default Menu;
