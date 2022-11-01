import { Route, Routes } from 'react-router-dom';

import { AuthLayout, DefaultLayout } from '@/layouts';
import { ResetPassword, SignIn, SignUp } from '@/pages/Auth';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Settings from '@/pages/Settings';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
