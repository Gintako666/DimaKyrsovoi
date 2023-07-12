import { FC } from 'react';

import Layout from '~/components/layout/Layout';
import Login from '~/components/shared/Login/Login';

const PageLogin: FC = () => (
  <Layout title="Login" className="login" header={ false }>
    <Login />
  </Layout>
);

export default PageLogin;
