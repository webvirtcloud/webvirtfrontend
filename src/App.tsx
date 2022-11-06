import { Provider as JotaiProvider } from 'jotai';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthLayout, DefaultLayout, ServerLayout } from '@/layouts';
import { ResetPassword, SignIn, SignUp } from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
import { Server, Servers } from '@/pages/Servers';
import Settings from '@/pages/Settings';

const App = (): JSX.Element => {
  return (
    <JotaiProvider>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Navigate to="/servers" />} />
          <Route path="/servers" element={<Servers />} />
          <Route element={<ServerLayout />}>
            <Route path="/servers/:uuid" element={<Server />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </JotaiProvider>
  );
};

export default App;
