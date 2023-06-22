import { useState, useEffect } from 'react';

interface IUseLoading {
  (object: any): boolean;
}

const useLoading: IUseLoading = (object) => {
  const [ isLoading, setIsLoading ] = useState(true);

  interface IHandleObjectLoad {
    (): void;
  }
  const handleObjectLoad: IHandleObjectLoad = () => setIsLoading(false);

  useEffect(() => {
    if (object.current.complete) {
      handleObjectLoad();
    } else {
      object.current.addEventListener('load', handleObjectLoad);

      return () => {
        object.current?.removeEventListener('load', handleObjectLoad);
      };
    }

    return undefined;
  }, [ object, isLoading ]);

  return isLoading;
};

export default useLoading;
