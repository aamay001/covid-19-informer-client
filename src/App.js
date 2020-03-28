import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fabric } from 'office-ui-fabric-react';
import {
  TopNavBar,
  MenuPanel,
  AppStyles,
  TopNotifications,
  AppLoading,
} from './components/App';
import Routes from './routes';
import { history } from './store';


/**
 * @class App
 * @name App
 * @description This component defines the application routes and layout.
 * The routes are not initialized until the user object has been populated.
 * All routes are children of the Navigation component. Role specific routes
 * are only created if the user has the appropriate role. The execution order of the application
 * is in the following order:<br/><br/>index.js -> appStart.js -> <strong>App.js</strong>
 * <br/><br/>
 * @author Andy Amaya
 */
class App extends Component {
  render() {
    const {
    } = this.props;
    return (
      <Fabric>
        <Router history={history}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <AppStyles />
            <TopNavBar />
            <div id="app-main-content">
              <MenuPanel />
              <Routes />
            </div>
            <TopNotifications />
          </div>
        </Router>}
        { /* <AppLoading /> */}
      </Fabric>
    );
  }
}

App.defaultProps = {
};

App.propTypes = {
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(App);
