import { Provider as JotaiProvider } from 'jotai';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ToastContextProvider } from '@/components/Toast/Provider';
import { AuthLayout, DefaultLayout, ServerLayout } from '@/layouts';
import { ResetPassword, SignIn, SignUp } from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
import { Server, Servers } from '@/pages/Servers';
import Settings from '@/pages/Settings';

const App = (): JSX.Element => {
  return (
    <JotaiProvider>
      <ToastContextProvider>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            {/* <Route path="/" element={<Navigate to="/servers" />} /> */}
            <Route path="/projects/:puuid/" element={<Navigate to="servers" />} />
            <Route path="/projects/:puuid/servers" element={<Servers />} />
            <Route element={<ServerLayout />}>
              <Route path="/projects/:puuid/servers/:suuid" element={<Server />} />
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
      </ToastContextProvider>
    </JotaiProvider>
  );
};

export default App;
