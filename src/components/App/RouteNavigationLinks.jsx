/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Icon, IconType } from 'office-ui-fabric-react';
import { connect } from 'react-redux';
import { ConfirmDialog } from '../General';
import { ROUTES } from '../../config/constants';
import { toggleMobileMenu } from '../../actions/app.actions';
import { lsHelper as ls } from '../../helpers';
import theme from '../../config/theme';

const RouteNavigationLinks = ({ currentRoute, dispatch }) => {
  const [hoveredRouteItem, setHoverItem] = useState('');
  const [showLogoutConfirm, setLogoutConfirm] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: '100%',
      }}
    >
      {Object.keys(ROUTES)
        .map(route => (ROUTES[route].SHOW_IN_NAV && ROUTES[route].ENABLED &&
          <NavLink
            to={ROUTES[route].PATH}
            href={ROUTES[route].PATH}
            key={`c19i-menu-item-${route}`}
            target={ROUTES[route].EXTERNAL ? '_blank' : undefined}
            onMouseEnter={() => setHoverItem(route)}
            onMouseLeave={() => setHoverItem('')}
            onClick={currentRoute === ROUTES[route].NAME
              ? (e) => {
                e.preventDefault();
                dispatch(toggleMobileMenu());
              }
              : (ROUTES[route].IS_LOGOUT
                ? (e) => {
                  e.preventDefault();
                  setLogoutConfirm(true);
                }
                : undefined)}
            style={{
              width: '100%',
              height: 55,
              color: theme.palette.darkTheme
                ? theme.palette.black
                : theme.palette.white,
              display: 'flex',
              textDecoration: 'none',
              flexDirection: 'row',
              alignItems: 'center',
              fontSize: theme.fonts.large.fontSize,
              justifyContent: 'evenly-spaced',
              paddingLeft: 20,
              backgroundColor: hoveredRouteItem === route
                ? theme.palette.themeDark
                : undefined,
            }}
          >
            {ROUTES[route].NAME}
            <Icon
              iconType={IconType.Default}
              iconName={ROUTES[route].ICON}
              style={{
                color: theme.palette.darkTheme
                  ? theme.palette.black
                  : theme.palette.white,
                fontSize: theme.fonts.large.fontSize,
                display: 'block',
                marginRight: 10,
                marginLeft: 'auto',
              }}
            />
          </NavLink>))}
      {showLogoutConfirm &&
        <ConfirmDialog
          title="Confirm Logout"
          open={showLogoutConfirm}
          onClickYes={() => {
            ls.logout();
            // eslint-disable-next-line
            window.location = ROUTES.LOGOUT.PATH;
          }}
          onClickNo={() => setLogoutConfirm(false)}
        >
          Are you sure you want to sign out?
        </ConfirmDialog>}
    </div>
  );
};

RouteNavigationLinks.defaultProps = {
  dispatch: () => {},
  currentRoute: ROUTES.HOME.NAME,
};

RouteNavigationLinks.propTypes = {
  dispatch: PropTypes.func,
  currentRoute: PropTypes.string,
};

const mapStateToProps = state => ({
  currentRoute: state.app.currentRoute,
});

export default withRouter(connect(mapStateToProps)(RouteNavigationLinks));
