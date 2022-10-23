import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { SignIn, SignUp } from './pages/Auth';
import { DefaultLayout } from 'components/layouts';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route element={ <DefaultLayout /> }>
        <Route path="/" element={ <Home /> } />
        <Route path="/sign-in" element={ <SignIn /> } />
        <Route path="/sign-up" element={ <SignUp /> } />
        <Route path="*" element={ <NotFound /> } />
      </Route>
    </Routes>
  );
};

export default App;
