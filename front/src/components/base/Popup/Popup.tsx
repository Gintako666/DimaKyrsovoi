import { FC, ReactNode } from 'react';

import Transition from '~/components/base/Transition/Transition';

import useScrollLock from '~/hooks/useScrollLock';

import handleClassName from '~/utils/className.util';
import Body from './Body';

interface PopupProps {
  className: string;
  modifier?: string;
  children: ReactNode;
  button: ReactNode;
}

const Popup: FC<PopupProps> = ({
  className, modifier, children, button,
}) => {
  const { isScrollLocked, setIsScrollLocked } = useScrollLock();

  const handleClick = () => {
    setIsScrollLocked(!isScrollLocked);
  };

  const modifiedClassName = handleClassName(
    !!modifier,
    `${ className }__popup`,
    modifier,
  );

  return (
    <div className={ `${ modifiedClassName } popup` }>
      <button type="button" className="popup__button" onClick={ handleClick }>
        {button}
      </button>
      <Transition condition={ isScrollLocked } className="popup">
        <Body onClick={ handleClick }>{children}</Body>
      </Transition>
    </div>
  );
};

Popup.defaultProps = {
  modifier: undefined,
};

export default Popup;
