import { Routing } from '@/pages';

import { withProviders } from './providers';

function App() {
  return (
    <div className="antialiased">
      <Routing />
    </div>
  );
}

export default withProviders(App);
