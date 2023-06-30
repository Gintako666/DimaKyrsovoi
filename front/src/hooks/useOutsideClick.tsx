import { RefObject, useEffect } from 'react';

interface IUseOutsideClick {
  (ref: RefObject<HTMLElement>, classNameOrFunction: string | (() => void)): void;
}

const useOutsideClick: IUseOutsideClick = (ref, classNameOrFunction) => {
  useEffect(() => {
    // Handle outside click
    interface IHandleOutsideClick {
      (e: MouseEvent): void;
    }
    const handleOutsideClick: IHandleOutsideClick = (e) => {
      const target = e.target as HTMLElement;
      const element = ref.current;
      const isClassName = typeof classNameOrFunction === 'string';

      if (element && !element.contains(target)) {
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

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [ ref, classNameOrFunction ]);
};

export default useOutsideClick;
