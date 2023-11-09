import React, {
  useState, useEffect, useMemo, useCallback, useContext,
} from 'react';
import { Directus } from '@directus/sdk';

export const directus = new Directus(process.env.NEXT_PUBLIC_BACK_URI, {
  storage: {
    prefix: 'front_',
    mode: 'LocalStorage',
  },
  auth: {
    mode: 'json',
    autoRefresh: true,
    msRefreshBeforeExpires: 30000,
    staticToken: '',
  },
});

const getCurrentUserData = async () => directus.users.me.read();
const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [ isLoading, setLoading ] = useState(true);
  const [ isLoggedIn, setLoggedIn ] = useState(false);
  const [ profileData, setProfileData ] = useState(null);

  const login = useCallback(
    async (email, password) => {
      setLoading(true);

      return directus.auth.login({
        email, password,
      })
        .then(async () => {
          setProfileData(
            await getCurrentUserData(),
          );
          setLoggedIn(true);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [ ],
  );

  const logout = useCallback(
    async () => {
      setLoading(true);

      return directus.auth.logout()
        .then(() => {
          setProfileData(false);
          setLoggedIn(false);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [ ],
  );

  useEffect(
    () => {
      setLoading(true);

      directus.auth.token
        .then(async (token) => {
          if (token) {
            setProfileData(
              await getCurrentUserData(),
            );
            setLoggedIn(true);
          } else {
            setProfileData(null);
            setLoggedIn(false);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [],
  );

  const value = useMemo(() => ({
    isLoading, isLoggedIn, profileData, login, logout, directus,
  }), [
    isLoading,
    isLoggedIn,
    profileData,
    login,
    logout,
    // directus,
  ]);

  return <UserContext.Provider value={ value }>{ children }</UserContext.Provider>;
};

export const UserConsumer = UserContext.Consumer;

export const useUser = () => {
  const context = useContext(UserContext);

  return context;
};

export default UserContext;
