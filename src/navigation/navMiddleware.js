import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);
