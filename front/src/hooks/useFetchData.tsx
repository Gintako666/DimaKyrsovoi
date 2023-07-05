import { useEffect, useState } from 'react';

const useFetchData = (url: string) => {
  const [ data, setData ] = useState<any>(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState('');

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(url);
        const result = await response.json();

        setData(result);
      };
      fetchData();
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [ url ]);

  return { data, isLoading, error };
};

export default useFetchData;
