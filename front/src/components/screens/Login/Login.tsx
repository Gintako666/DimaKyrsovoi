import { FC } from 'react';
import FullScreen from '~/components/base/FullScreen/FullScreen';
import Form from './Form';

const Login: FC = () => (
  <FullScreen className="login">
    <Form />
  </FullScreen>
);

export default Login;
