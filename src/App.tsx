import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthLayout, DefaultLayout, ServerLayout } from '@/layouts';
import { ResetPassword, SignIn, SignUp } from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
import { Server, Servers } from '@/pages/Servers';
import Settings from '@/pages/Settings';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Navigate to="/servers" />} />
        <Route path="/servers" element={<Servers />} />
        <Route element={<ServerLayout />}>
          <Route path="/servers/:uuid" element={<Server />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
