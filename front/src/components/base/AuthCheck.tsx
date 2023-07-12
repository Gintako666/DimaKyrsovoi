import { FC, ReactNode,  } from 'react';

import Layout from '~/components/layout/Layout';
import Login from '~/components/shared/Login/Login';

import { useUser } from '~/contexts/user';

interface IAuthCheck {
  children: ReactNode
}

const AuthCheck: FC<IAuthCheck> = ({ children }) => {
  const { isLoggedIn, isLoading } = useUser();

  if (!isLoggedIn && !isLoading){
    return <Layout title='Login' className='login' header={false}>
      <Login />
    </Layout>
  }
  return children;
};

export default AuthCheck;
