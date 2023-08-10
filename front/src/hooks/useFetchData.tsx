import { useEffect, useState } from 'react';

export interface IUseFetchDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string;
}

/* eslint-disable-next-line @typescript-eslint/comma-dangle */
const useFetchData = <T,>(
  request: (
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    searchParams?: any
  ) => Promise<T>,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  searchParams?: any,
): IUseFetchDataResult<T> => {
  const [ data, setData ] = useState<T | null>(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request(searchParams);
        setData(response);
      } catch (
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        err: any
      ) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [ request, searchParams ]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetchData;
