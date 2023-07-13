import {
  FC, ReactNode, useEffect, useState,
} from 'react';

import { useUser } from '~/contexts/user';
import PageLogin from './Pages/PageLogin';
import PageLoading from './Pages/PageLoading';

interface IAuthCheck {
  children: ReactNode
}

const AuthCheck: FC<IAuthCheck> = ({ children }) => {
  const [ isLoadingPage, setIsLoadingPage ] = useState(true);

  const { isLoggedIn, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading) {
      setIsLoadingPage(false);
    }
  }, [ isLoading ]);

  if (isLoadingPage) {
    return (
      <PageLoading />
    );
  }
  if (!isLoggedIn) {
    return (
      <PageLogin />
    );
  }
  return children;
};

export default AuthCheck;
