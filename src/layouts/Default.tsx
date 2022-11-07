import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import tw from 'twin.macro';

import { getProfile } from '@/api/account';
import Sidebar from '@/components/Sidebar';
import { useProfileStore } from '@/store/profile';

const DefaultLayout = (): JSX.Element => {
  const setProfile = useSetAtom(useProfileStore);
  const { pathname } = useLocation();
  const isAuthenticated = !!window.localStorage.getItem('token');

  if (
    pathname === '/sign-in' ||
    pathname === '/sign-up' ||
    pathname === '/reset-password'
  ) {
    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await getProfile();

      setProfile(response.profile);
    };

    fetch().catch(console.error);
  }, []);

  return isAuthenticated ? (
    <main css={tw`min-h-screen flex`}>
      <Sidebar />
      <div css={tw`flex-1 p-8 pl-64`}>
        <Outlet />
      </div>
    </main>
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default DefaultLayout;
