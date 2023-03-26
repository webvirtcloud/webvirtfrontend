import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md p-4">
        <img
          className="mx-auto mb-4 h-12 w-12"
          src={new URL('/src/shared/assets/images/logo.svg', import.meta.url).href}
          alt="Logotype"
        />
        <Outlet />
      </div>
    </div>
  );
}
