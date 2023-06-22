import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const useRedirectToHomepage = (): number => {
  const [ time, setTime ] = useState(10);
  const router = useRouter();

  useEffect(() => {
    if (time <= 0) {
      router.push('/');
    } else {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [ time, router ]);

  return time;
};

export default useRedirectToHomepage;
