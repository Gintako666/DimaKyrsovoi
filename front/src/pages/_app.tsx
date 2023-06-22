import type { AppProps } from 'next/app';
import Head from 'next/head';

// import { Provider } from "react-redux";
// import { store } from "~/provider/store";

import '~/assets/scss/globals.scss';

const App = ({ Component, pageProps }: AppProps) => (
  // <Provider store={store}>
  <>
    <Head>
      {/* <meta charset="utf-8" /> */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />
      {/* A brief description of the page  */}
      {/* <meta name="description" content="" /> */}
      {/* Disconnects the formation of a link by the phone number on iOS */}
      {/* <meta name="format-detection" content="telephone=no" /> */}
      {/* Key words of the page  */}
      {/* <meta name="keywords" content="" /> */}
      {/* Search robots access control to the page */}
      {/* <meta name="robots" content="" /> */}
      {/* The author of the page */}
      {/* <meta name="author" content="" /> */}
      {/* Copyright */}
      {/* <meta name="copyright" content="" /> */}
      {/* The address of the author */}
      {/* <meta name="address" content="" /> */}
      {/* Card type, summary is used by default */}
      {/* <meta name="twitter:card" content="summary" /> */}
      {/* Page name */}
      {/* <meta name="twitter:title" content="" /> */}
      {/* Page description */}
      {/* <meta name="twitter:description" content="" /> */}
      {/* System on the image */}
      {/* <meta name="twitter:image" content="" /> */}
      {/* Site localization */}
      {/* <meta property="og:locale" content="en_US" /> */}
      {/* Site localization, for the Ukrainian-language site uk_UA */}
      {/* <meta property="og:locale:alternate" content="uk_UA" /> */}
      {/* Type of content */}
      {/* <meta property="og:type" content="website" /> */}
      {/* The title of the page that will be displayed in the recording of the social network */}
      {/* <meta property="og:title" content="" /> */}
      {/* Page description */}
      {/* <meta property="og:description" content="" /> */}
      {/* Link to the image that will be published in the recording */}
      {/* <meta property="og:image" content="" /> */}
      {/* <meta property="og:image:alt" content="" /> */}
      {/* Link to the current page */}
      {/* <meta property="og:url" content="" /> */}
      {/* Name of the site */}
      {/* <meta property="og:site_name" content="" /> */}
    </Head>
    <Component { ...pageProps } />
  </>
  // </Provider>
);

export default App;
