import { FC } from 'react';

import handleClassName from '~/utils/className.util';
import useFullHeight from './useFullHeight';

interface FullScreenProps {
  className: string;
  modifier?: string;
  children?: JSX.Element;
  background?: JSX.Element;
}

const FullScreen: FC<FullScreenProps> = ({
  className,
  modifier,
  children,
  background,
}) => {
  const height = useFullHeight();

  const modifiedClassName = handleClassName(
    !!modifier,
    `${ className }__full-screen`,
    modifier,
  );

  const style = {
    minHeight: height,
  };

  return (
    <div className={ `${ modifiedClassName } full-screen` } style={ style }>
      <div className="full-screen__body">{children}</div>
      {background}
    </div>
  );
};

FullScreen.defaultProps = {
  modifier: undefined,
  children: undefined,
  background: undefined,
};

export default FullScreen;
