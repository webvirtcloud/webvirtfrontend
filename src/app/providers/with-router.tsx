import { ComponentType, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = (Component: ComponentType) => () =>
  (
    <BrowserRouter>
      <Suspense>
        <Component />
      </Suspense>
    </BrowserRouter>
  );
