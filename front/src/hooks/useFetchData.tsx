import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

export interface IUseFetchDataResult {
  /*  eslint-disable @typescript-eslint/no-explicit-any */
  data: any;
  /*  eslint-disable @typescript-eslint/no-explicit-any */
  isLoading: boolean;
  error: string;
}

interface IUseFetchData {
  (
    request: (searchParams: string) => Promise<AxiosResponse<any>>,
    searchParams?: string
  )
  : IUseFetchDataResult;
}

const useFetchData: IUseFetchData = (request, searchParams = '') => {
  // eslint-disable @typescript-eslint/no-explicit-any
  const [ data, setData ] = useState<any>(null);
  // eslint-disable @typescript-eslint/no-explicit-any
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request(searchParams);

        setData(response.data);
      } catch (
        /*  eslint-disable @typescript-eslint/no-explicit-any */
        err: any
        /*  eslint-disable @typescript-eslint/no-explicit-any */
      ) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [ request, searchParams ]);

  return { data, isLoading, error };
};

export default useFetchData;
