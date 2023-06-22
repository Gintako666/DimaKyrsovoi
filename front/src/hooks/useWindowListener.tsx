import { useEffect } from 'react';

interface IUseWindowListener {
  (handler: () => void, event?: string): void;
}

const useWindowListener: IUseWindowListener = (
  handler,
  event = 'resize',
) => {
  useEffect(() => {
    handler();
    window.addEventListener(event, handler);

    return () => {
      window.removeEventListener(event, handler);
    };
  }, [ handler, event ]);
};

export default useWindowListener;
