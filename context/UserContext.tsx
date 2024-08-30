import { getCookie } from '@/utils/cookies';
import getConfig from 'next/config';
import { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  user: any;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType>({ user: null, isLoggedIn: false });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [ user, setUser ] = useState(null);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  const { publicRuntimeConfig } = getConfig();

  useEffect(() => {
    const fetchUser = async () => {
      const sessionCookie = getCookie('session');
      
      if (sessionCookie) {
        try {
          const res = await fetch('/api/v1/user/@me');

          if (res.ok) {
            const userData = await res.json();

            setIsLoggedIn(true);
            setUser(userData);
          } else {
            document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);