import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

export interface IUseFetchDataResult {
  data: any;
  isLoading: boolean;
  error: string;
}

interface IUseFetchData {
  (request: () => Promise<AxiosResponse<any>>): IUseFetchDataResult;
}

const useFetchData: IUseFetchData = (request) => {
  const [ data, setData ] = useState<any>(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request();

        setData(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [ request ]);

  return { data, isLoading, error };
};

export default useFetchData;
