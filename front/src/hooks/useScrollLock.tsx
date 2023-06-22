import {
  Dispatch, SetStateAction, useState, useEffect,
} from 'react';

interface IUseScrollLock {
  (): {
    isScrollLocked: boolean;
    setIsScrollLocked: Dispatch<SetStateAction<boolean>>;
  };
}

const useScrollLock: IUseScrollLock = () => {
  const [ isScrollLocked, setIsScrollLocked ] = useState(false);

  useEffect(() => {
    const { body } = document;

    if (isScrollLocked) {
      body.classList.add('lock');
    } else {
      body.classList.remove('lock');
    }

    return () => {
      body.classList.remove('lock');
    };
  }, [ isScrollLocked ]);

  return {
    isScrollLocked,
    setIsScrollLocked,
  };
};

export default useScrollLock;
