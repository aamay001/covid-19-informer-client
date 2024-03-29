import React from 'react';
import { Router } from 'react-router-dom';
import { Fabric } from 'office-ui-fabric-react';
import {
  TopNavBar,
  AppStyles,
  TopNotifications,
  BottomNotifications,
} from './components/App';
import Routes from './routes';
import { history } from './store';
import { uiHelper } from './helpers';

const App = () => (
  <Fabric>
    <Router history={history}>
      <div style={uiHelper.flex.column}>
        <AppStyles />
        <TopNavBar />
        <div id="app-main-content">
          <Routes />
        </div>
        <TopNotifications />
        <BottomNotifications />
      </div>
    </Router>
  </Fabric>
);

export default App;
