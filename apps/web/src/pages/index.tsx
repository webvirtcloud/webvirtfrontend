import loadable from '@loadable/component';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthLayout, DefaultLayout, ServerLayout } from '@/shared/layouts';

const SignIn = loadable(() => import('@/pages/login'));
const SignUp = loadable(() => import('@/pages/register'));
const ResetPassword = loadable(() => import('@/pages/reset-password'));
const CreateServer = loadable(() => import('@/pages/servers/create/create-server'));
const Servers = loadable(() => import('@/pages/servers/servers'));
const Server = loadable(() => import('@/pages/Server/Server'));
const Keypairs = loadable(() => import('@/pages/Keypairs'));
const Settings = loadable(() => import('@/pages/settings'));
const NotFound = loadable(() => import('@/pages/not-found'));

export function Routing() {
  const isAuthenticated = !!window.localStorage.getItem('token');

  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Navigate to="/servers" />} />
          <Route path="/servers" element={<Servers />} />
          <Route path="/servers/create" element={<CreateServer />} />
          <Route path="/keypairs" element={<Keypairs />} />
          <Route element={<ServerLayout />}>
            <Route path="/servers/:suuid" element={<Server />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Routes>
  );
}
