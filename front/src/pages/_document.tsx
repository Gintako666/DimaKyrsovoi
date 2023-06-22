import {
  Html, Head, Main, NextScript,
} from 'next/document';

const Document = () => (
  <Html lang="en">
    <Head>
      <link rel="apple-touch-icon" href="/favicon.svg" />
      <link rel="icon" href="/favicon.svg" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
