import { useEffect, useState } from 'react';
import axios from 'axios';

import axiosInstance from '~/services/axiosInstance';

export interface IUseFetchDataResult {
  data: any;
  isLoading: boolean;
  error: string;
}

interface IUseFetchData {
  (url: string, isAxiosInstance?: boolean): IUseFetchDataResult
}

const useFetchData: IUseFetchData = (url, isAxiosInstance = true) => {
  const [ data, setData ] = useState<any>(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = isAxiosInstance ? await axiosInstance.get(url) : await axios.get(url);

        setData(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [ url ]);

  return { data, isLoading, error };
};

export default useFetchData;
