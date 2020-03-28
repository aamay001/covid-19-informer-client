import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel, PanelType, Toggle } from 'office-ui-fabric-react';
import PanelNavigation from './PanelNavigation';
import RouteNavigationLinks from './RouteNavigationLinks';
import { theme, constants } from '../../config';
import { toggleDarkMode, darkModeState } from '../../config/theme';
import { toggleMobileMenu } from '../../actions/app.actions';

const { APP: { COMPANY, NAME } } = constants;

const panelStyles = {
  main: {
    color: theme.palette.white,
    backgroundColor: theme.palette.darkTheme
      ? theme.palette.white
      : theme.palette.black,
    padding: 0,
    maxWidth: 475,
  },
  content: {
    padding: 0,
  },
};

const MenuPanel = ({
  dispatch,
  showMobileMenu,
}) => (
  <>
    <Panel
      hasCloseButton={false}
      isOpen={showMobileMenu}
      isLightDismiss
      type={PanelType.customNear}
      styles={panelStyles}
      onDismiss={() => dispatch(toggleMobileMenu())}
      onRenderNavigation={() =>
        PanelNavigation({ dispatch })}
      isFooterAtBottom
      onRenderFooterContent={() => (
        <>
          <Toggle
            checked={darkModeState}
            onText="Dark Mode On"
            offText="Dark Mode Off"
            styles={{ text: { color: 'white' } }}
            onChange={(e, state) => toggleDarkMode(state)}
          />
          <footer
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: 'white',
              textAlign: 'center',
              width: '100%',
            }}
          >
            {`${COMPANY} © ${new Date().getFullYear()} - ${NAME}`}
          </footer>
        </>
      )}
    >
      <RouteNavigationLinks />
    </Panel>
  </>
);

MenuPanel.defaultProps = {
  dispatch: () => {},
  showMobileMenu: false,
};

MenuPanel.propTypes = {
  showMobileMenu: PropTypes.bool,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
  showMobileMenu: state.app.showMobileMenu,
});

export default connect(mapStateToProps)(MenuPanel);
