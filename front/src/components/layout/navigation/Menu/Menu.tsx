import { FC } from 'react';

import handleClassName from '~/utils/className.util';

import links from '~/components/layout/navigation/links/links.const';

import Items from './Items/Items';
import Profile from './Profile/Profile';

interface MenuProps {
  isScrollLocked: boolean;
  onClick: () => void;
}

const Menu: FC<MenuProps> = ({ isScrollLocked, onClick }) => (
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
    <Profile />
  </div>
);

export default Menu;
