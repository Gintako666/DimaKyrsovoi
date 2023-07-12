import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useUser } from '~/contexts/user';

interface IAuthCheck {
  children: ReactNode
}

const AuthCheck: FC<IAuthCheck> = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useUser();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push('/login');
    }
  }, [ router, isLoggedIn, isLoading ]);

  return children;
};

export default AuthCheck;
