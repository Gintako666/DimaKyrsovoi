import { FC } from 'react';

import Img from '~/components/base/Img/Img';

import { useUser } from '~/contexts/user';

import arrow from '~/assets/img/icons/arrow.svg';

const ExitButton: FC = () => {
  const { logout } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      alert(err);
    }
  };

  const exitImg = {
    src: arrow,
    alt: 'Profile',
  };

  return (
    <button type="button" className="profile__exit" onClick={ handleLogout }>
      <div>
        <Img className="profile" modifier="exit" img={ exitImg } resetStyle />
        <span>Exit</span>
      </div>
    </button>
  );
};

export default ExitButton;
