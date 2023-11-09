import { FC } from 'react';

import { Inter } from 'next/font/google';
import handleClassName from '~/utils/className.util';
import { useUser } from '~/contexts/user';

const inter = Inter({
  subsets: [
    'latin',
  ],
});

interface LayoutProps {
  className: string;
  header?: boolean;
  children: JSX.Element;
}

const Layout: FC<LayoutProps> = ({
  className,
  header,
  children,
}) => {
  const { profileData } = useUser();
  const modifiedClassName = handleClassName(!!header, 'wrapper', 'header');

  return (
    <div className={ `${ modifiedClassName } ${ inter.className }` }>
      <header>
        {profileData && profileData.email}

      </header>
      <main className={ `${ className }-page` }>{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  header: true,
};

export default Layout;
