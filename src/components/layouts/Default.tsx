import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default () => {
  const { pathname } = useLocation();
  const isAuthenticated = !!window.localStorage.getItem('token');

  if (pathname === '/sign-in' || pathname === '/sign-up') {
    return (<Outlet />);
  }

  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" replace />
  )
}