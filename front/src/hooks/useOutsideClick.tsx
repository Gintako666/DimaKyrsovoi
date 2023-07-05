import { RefObject, useEffect } from 'react';

interface IUseOutsideClick {
  (ref: RefObject<HTMLElement>, classNameOrFunction: string | (() => void)): void;
}

const useOutsideClick: IUseOutsideClick = (ref, classNameOrFunction) => {
  // Handle outside click
  interface IHandleOutsideClick {
    (e: MouseEvent): void;
  }
  const handleOutsideClick: IHandleOutsideClick = ({ target }) => {
    const element = ref.current;

    if (element && !element.contains(target as Node)) {
      const isClassName = typeof classNameOrFunction === 'string';

      if (isClassName) {
        const activeElements = document.querySelectorAll(`.${ classNameOrFunction }`);
        activeElements.forEach((activeElement) => {
          activeElement.classList.remove(classNameOrFunction);
        });
      } else {
        classNameOrFunction();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [ ref, classNameOrFunction ]);
};

export default useOutsideClick;
