import compose from 'compose-function';

import { withQuery } from './with-query';
import { withRouter } from './with-router';
import { withSidebar } from './with-sidebar';

export const withProviders = compose(withQuery, withRouter, withSidebar);
