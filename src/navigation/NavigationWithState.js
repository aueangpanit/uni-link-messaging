import { connect } from 'react-redux';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';
import { Navigation } from './Navigation';

var NavigationWithState = reduxifyNavigator(Navigation, 'root');

const mapStateToProps = state => ({
  state: state.navigation
});

NavigationWithState = connect(mapStateToProps)(NavigationWithState);
export { NavigationWithState };
