import { FC } from 'react';

import { Inter } from 'next/font/google';
import handleClassName from '~/utils/className.util';
import Meta from './Meta';
import Header from './Header/Header';

const inter = Inter({
  subsets: [
    'latin',
  ],
});

interface LayoutProps {
  title: string;
  className: string;
  header?: boolean;
  children: JSX.Element;
}

const Layout: FC<LayoutProps> = ({
  title,
  className,
  header,
  children,
}) => {
  const modifiedClassName = handleClassName(!!header, 'wrapper', 'header');

  return (
    <>
      <Meta title={ title } />
      <div className={ `${ modifiedClassName } ${ inter.className }` }>
        {header && <Header />}
        <main className={ `${ className }-page` }>{children}</main>
      </div>
    </>
  );
};

Layout.defaultProps = {
  header: true,
};

export default Layout;
