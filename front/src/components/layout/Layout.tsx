import { FC } from 'react';

import { useUser } from '~/contexts/user';

interface LayoutProps {
  children: JSX.Element;
}

const Layout: FC<LayoutProps> = ({
  children,
}) => {
  const { profileData, logout, isLoggedIn } = useUser();

  return (
    <div>
      {isLoggedIn && (
      <header>
        {profileData.email}
        <button type="button" onClick={ () => logout() }>Logout</button>

      </header>
      )}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
