import {
  FC, useRef, useState,
} from 'react';

import Img from '~/components/base/Img/Img';

import useOutsideClick from '~/hooks/useOutsideClick';

import handleClassName from '~/utils/className.util';

import isTouchScreen from '~/constants/isTouchScreen.const';

import avatar from '~/assets/img/avatar.jpg';
import ExitButton from './ExitButton';

const Profile: FC = () => {
  const [ isActive, setIsActive ] = useState(false);
  const menuProfileRef = useRef<HTMLDivElement>(null);

  // Handle active
  interface IHandleActive {
    (): void;
  }
  const handleActive: IHandleActive = () => {
    setIsActive(!isActive);
  };

  // Handle deactivate
  interface IHandleDeactivate {
    (): void;
  }
  const handleDeactivate: IHandleDeactivate = () => {
    setIsActive(false);
  };
  useOutsideClick(menuProfileRef, handleDeactivate);

  const modifiedClassName = handleClassName(isActive, 'profile');

  const avatarImg = {
    src: avatar,
    alt: 'Profile',
  };

  return (
    <div
      role="button"
      className={ `menu__profile ${ modifiedClassName }` }
      ref={ menuProfileRef }
      { ...(isTouchScreen
        ? { onClick: handleActive }
        : {
          onMouseEnter: handleActive,
          onMouseLeave: handleActive,
        }) }
    >
      <Img className="profile" modifier="avatar" img={ avatarImg } />
      <ExitButton />
    </div>
  );
};

export default Profile;
