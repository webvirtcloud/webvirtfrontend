import compose from 'compose-function';

import { withRouter } from './with-router';
import { withStore } from './with-store';
import { withToasts } from './with-toasts';

export const withProviders = compose(withRouter, withStore, withToasts);
