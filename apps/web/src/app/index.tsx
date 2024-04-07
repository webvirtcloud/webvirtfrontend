import { Toaster as SonnerToaster } from 'ui/components/sonner';
import { Toaster } from 'ui/components/toast';

import { Routing } from '@/pages';

import { withProviders } from './providers';

function App() {
  return (
    <div className="antialiased">
      <Routing />
      <Toaster />
      <SonnerToaster />
    </div>
  );
}

export default withProviders(App);
