import {
  Dispatch, FC, ReactNode, SetStateAction,
} from 'react';

import Transition from '~/components/base/Transition/Transition';

import useScrollLock from '~/hooks/useScrollLock';

import handleClassName from '~/utils/className.util';
import classNames from 'classnames';
import Body from './Body';

interface PopupProps {
  className: string;
  modifier?: string;
  children: ReactNode;
  button: ReactNode;
  buttonClassName?: string;
  isActive?: boolean;
  setIsActive?: Dispatch<SetStateAction<boolean>>
}

const Popup: FC<PopupProps> = ({
  className, modifier, children, button, buttonClassName, isActive, setIsActive,
}) => {
  const { isScrollLocked, setIsScrollLocked } = useScrollLock();

  const isActiveIsUndefined = typeof isActive === 'undefined';

  const handleClick = () => {
    if (!isActiveIsUndefined && setIsActive) {
      setIsActive(!isActive);
    } else {
      setIsScrollLocked(!isScrollLocked);
    }
  };

  const handleDisablePopup = () => {
    if (!isActiveIsUndefined && setIsActive) {
      setIsActive(false);
    } else {
      setIsScrollLocked(false);
    }
  };

  const condition = isActiveIsUndefined ? isScrollLocked : isActive;

  const modifiedClassName = handleClassName(
    !!modifier,
    `${ className }__popup`,
    modifier,
  );

  return (
    <div className={ `${ modifiedClassName } popup` }>
      {button && (
      <button
        type="button"
        className={ classNames('popup__button', buttonClassName) }
        onClick={ handleClick }
      >
        {button}
      </button>
      )}
      <Transition condition={ condition } className="popup">
        <Body onClick={ handleDisablePopup }>{children}</Body>
      </Transition>
    </div>
  );
};

Popup.defaultProps = {
  modifier: undefined,
  isActive: undefined,
  setIsActive: undefined,
  buttonClassName: '',
};

export default Popup;
