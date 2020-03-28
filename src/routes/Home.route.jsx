import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Icon, IconType, Text } from 'office-ui-fabric-react';
import { FullLogo, RouteRootFlex } from '../components/General';
import { setCurrentRoute } from '../actions/app.actions';
import { boxShadow } from '../helpers/ui.helper';
import { ROUTES, APP } from '../config/constants';
import theme from '../config/theme';

class Home extends Component {
  constructor(props) {
    super(props);
    const { currentRoute, dispatch } = props;
    if (currentRoute !== ROUTES.HOME.NAME) {
      dispatch(setCurrentRoute(ROUTES.HOME.NAME));
    }
    this.state = {
      hoveredRouteItem: '',
    };
  }

  render() {
    const { currentRoute } = this.props;
    const { hoveredRouteItem } = this.state;
    return (
      <RouteRootFlex style={{ maxWidth: 550 }} id="c19i-home-route">
        <FullLogo />
        <h1 style={{ marginBottom: 0 }}>{APP.NAME}</h1>
        <div style={{ marginTop: 35, width: '85%' }}>
          {Object.keys(ROUTES)
            .filter(route => ROUTES[route].ENABLED &&
              ROUTES[route].SHOW_IN_MENU && route !== 'HOME')
            .map((route => (
              <NavLink
                to={ROUTES[route].PATH}
                href={ROUTES[route].PATH}
                key={`c19i-home-menu-item-${route}`}
                target={ROUTES[route].EXTERNAL ? '_blank' : undefined}
                onMouseEnter={() => this.setState({ hoveredRouteItem: route })}
                onMouseLeave={() => this.setState({ hoveredRouteItem: '' })}
                onClick={currentRoute === ROUTES[route].NAME
                  ? (e) => { e.preventDefault(); }
                  : undefined}
                style={{
                  width: '100%',
                  display: 'block',
                  height: 55,
                  color: hoveredRouteItem === route
                    ? theme.palette.white
                    : theme.palette.black,
                  textDecoration: 'none',
                  boxShadow: boxShadow.noRaise,
                  backgroundColor: hoveredRouteItem === route
                    ? theme.palette.themeDark
                    : undefined,
                }}
              >
                <Text
                  style={{
                    width: '100%',
                    fontSize: 17,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    iconType={IconType.Default}
                    iconName={ROUTES[route].ICON}
                    style={{
                      color: hoveredRouteItem === route
                        ? theme.palette.white
                        : theme.palette.black,
                      fontSize: 28,
                      display: 'inline',
                      marginRight: 10,
                    }}
                  />
                  <p>{ROUTES[route].NAME}</p>
                </Text>
              </NavLink>)))}
        </div>
      </RouteRootFlex>
    );
  }
}

Home.defaultProps = {
  dispatch: () => {},
  currentRoute: ROUTES.HOME.NAME,
};

Home.propTypes = {
  dispatch: PropTypes.func,
  currentRoute: PropTypes.string,
};

const mapStateToProps = state => ({
  currentRoute: state.app.currentRoute,
});

export default connect(mapStateToProps)(Home);
