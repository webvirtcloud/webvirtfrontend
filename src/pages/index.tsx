import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthLayout, DefaultLayout, ServerLayout } from '@/shared/layouts';

const SignIn = lazy(() => import('@/pages/auth/sign-in'));
const SignUp = lazy(() => import('@/pages/auth/sign-up'));
const ResetPassword = lazy(() => import('@/pages/auth/reset-password'));
const CreateServer = lazy(() => import('./Servers/Create/CreateServer'));
const Servers = lazy(() => import('./Servers/Servers'));
const Server = lazy(() => import('./Server/Server'));
const Keypairs = lazy(() => import('@/pages/Keypairs/Keypairs'));
const Settings = lazy(() => import('./Settings/Settings'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));

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
