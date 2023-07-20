import { useEffect, useState } from 'react';

export interface IUseFetchDataResult {
  data: any | null;
  isLoading: boolean;
  error: string;
}

/* eslint-disable-next-line @typescript-eslint/comma-dangle */
const useFetchData = (
  request: (searchParams?: any) => Promise<any>,
  searchParams?: any,
): IUseFetchDataResult => {
  const [ data, setData ] = useState<any>(null);
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
