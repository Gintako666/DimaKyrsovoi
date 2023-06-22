import { FC, useState } from 'react';

import Img from '~/components/base/Img/Img';

import handleClassName from '~/utils/className.util';

import isTouchScreen from '~/constants/isTouchScreen.const';

import profile from '~/assets/img/profile.jpg';
import arrow from '~/assets/img/icons/arrow.svg';

const Profile: FC = () => {
  const [ isActive, setIsActive ] = useState(false);

  // Handle active
  interface IHandleActive {
    (): void;
  }
  const handleActive: IHandleActive = () => {
    setIsActive(!isActive);
  };

  const modifiedClassName = handleClassName(isActive, 'menu__profile');

  const profileImg = {
    src: profile,
    alt: 'Profile',
  };

  const exitImg = {
    src: arrow,
    alt: 'Profile',
  };

  return (
    <button
      type="button"
      className={ modifiedClassName }
      { ...(isTouchScreen
        ? { onClick: handleActive }
        : {
          onMouseEnter: handleActive,
          onMouseLeave: handleActive,
        }) }
    >
      <Img className="menu" modifier="profile" img={ profileImg } />
      <div className="menu__sub-profile">
        <div>
          <Img className="menu" modifier="exit" img={ exitImg } resetStyle />
          <span>Exit</span>
        </div>
      </div>
    </button>
  );
};

export default Profile;
