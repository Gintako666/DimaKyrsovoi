import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

import FullScreen from '~/components/base/FullScreen/FullScreen';
import { useUser } from '~/contexts/user';
import Form from './Form';

const Login: FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const isLoginPage = currentPath === '/login';

  const { isLoggedIn } = useUser();

  useEffect(() => {
    if (isLoggedIn && isLoginPage) {
      router.push('/');
    }
  }, [ router, isLoggedIn ]);

  return (
    <FullScreen className="login">
      <Form />
    </FullScreen>
  );
};

export default Login;
