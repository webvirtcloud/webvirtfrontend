import { Toaster } from 'ui/components/toast';

import { Routing } from '@/pages';

import { withProviders } from './providers';

function App() {
  return (
    <div className="antialiased">
      <Routing />
      <Toaster />
    </div>
  );
}

export default withProviders(App);
