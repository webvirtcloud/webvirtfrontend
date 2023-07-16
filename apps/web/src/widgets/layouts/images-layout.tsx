import { Outlet } from 'react-router-dom';

export function ImagesLayout() {
  return (
    <div className="mx-auto max-w-6xl">
      <Outlet />
    </div>
  );
}
