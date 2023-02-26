import { ComponentType } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = (Component: ComponentType) => () =>
  (
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  );
