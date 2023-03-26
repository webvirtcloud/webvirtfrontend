import { Outlet } from 'react-router-dom';
import { Navbar } from '@/widgets/nav-bar';

export function DefaultLayout() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-8">
        <Outlet />
      </div>
    </main>
  );
}
