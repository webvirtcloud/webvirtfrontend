import { Navigate, Outlet, useLocation } from 'react-router-dom';
import tw from 'twin.macro';

import Sidebar from '@/components/Sidebar';

const DefaultLayout = (): JSX.Element => {
  const { pathname } = useLocation();
  const isAuthenticated = !!window.localStorage.getItem('token');

  if (
    pathname === '/sign-in' ||
    pathname === '/sign-up' ||
    pathname === '/reset-password'
  ) {
    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
  }

  return isAuthenticated ? (
    <main css={tw`min-h-screen flex`}>
      <Sidebar />
      <div css={tw`flex-1 p-8`}>
        <Outlet />
      </div>
    </main>
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default DefaultLayout;
