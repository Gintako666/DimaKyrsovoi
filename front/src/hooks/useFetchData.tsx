import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

export interface IUseFetchDataResult {
  data: any;
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
  const [ data, setData ] = useState<any>(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request(searchParams);

        setData(response.data);
      } catch (err: any) {
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
