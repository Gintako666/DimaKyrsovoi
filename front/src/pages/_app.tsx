import type { AppProps } from 'next/app';
import Head from 'next/head';

import { UserProvider } from '~/contexts/user';
import AuthCheck from '~/components/base/AuthCheck';

import '~/assets/scss/globals.scss';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />
    </Head>
    <UserProvider>
      <AuthCheck>
        <Component { ...pageProps } />
      </AuthCheck>
    </UserProvider>
  </>
);

export default App;
