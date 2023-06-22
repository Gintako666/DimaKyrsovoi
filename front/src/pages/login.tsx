import { NextPage } from 'next';
import Layout from '~/components/layout/Layout';
import LoginPage from '~/components/screens/Login/Login';

const Login: NextPage = () => (
  <Layout title="Login" className="login" header={ false }>
    <LoginPage />
  </Layout>
);

export default Login;
