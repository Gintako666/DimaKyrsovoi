import { useEffect, useState } from 'react';

export interface IUseFetchDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string;
}

function useFetchData <T>(
  request: (params: any) => Promise<{ data: T }>,
  params?: any,
): IUseFetchDataResult<T> {
  const [ data, setData ] = useState<T | null>(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request(params);

        setData(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [ request, params ]);

  return { data, isLoading, error };
}

export default useFetchData;
