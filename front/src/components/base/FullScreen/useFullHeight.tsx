import { useState } from 'react';

import useWindowListener from '~/hooks/useWindowListener';

interface IUseFullHeight {
  (): string;
}

const useFullHeight: IUseFullHeight = () => {
  const [ height, setHeight ] = useState('100vh');

  const handleHeightUpdate = () => {
    const windowHeight = window.innerHeight;
    setHeight(`${ windowHeight - 0.0001 }px`);
  };
  useWindowListener(handleHeightUpdate);

  return height;
};

export default useFullHeight;
