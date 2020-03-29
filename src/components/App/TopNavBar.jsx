import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Icon,
  IconType,
  Image,
  ImageFit,
  CommandButton,
} from 'office-ui-fabric-react';
import { toggleMobileMenu } from '../../actions/app.actions';
import { ROUTES } from '../../config/constants';
import logo from '../../content/images/logo.png';
import theme from '../../config/theme';

const reportItems = () => {
  let items;
  if (ROUTES.REPORTS.SUB_ROUTES && ROUTES.REPORTS.SUB_ROUTES.length > 0) {
    items = ROUTES.REPORTS.SUB_ROUTES
      .filter(sr => (sr.ENABLED))
      .map(sr => ({
        key: `c19i_${sr.NAME}`,
        text: sr.NAME,
        iconProps: { iconName: sr.ICON },
        href: sr.PATH,
        target: '_blank',
      }));
  } else {
    items = [];
  }
  return items;
};

const TopNavBar = ({
  dispatch,
  showMobileMenu,
}) => (
  <nav
    style={{
      backgroundColor: theme.palette.darkTheme
        ? theme.palette.blueDark
        : theme.palette.black,
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: '100%',
      minWidth: '100%',
      height: 55,
      position: 'fixed',
      zIndex: 1000,
      top: 0,
    }}
  >
    <div>
      <button
        type="button"
        style={{
          padding: 0,
          MozAppearance: 'none',
          WebkitAppearance: 'none',
          appearance: 'none',
          backgroundColor: theme.palette.darkTheme
            ? theme.palette.blueDark
            : theme.palette.black,
          border: 'none',
          height: 55,
          width: 55,
          outline: 'none',
        }}
        onClick={() => dispatch(toggleMobileMenu())}
      >
        <Icon
          iconName={showMobileMenu
            ? 'Cancel'
            : 'GlobalNavButton'}
          iconType={IconType.Default}
          style={{
            color: theme.palette.darkTheme
              ? theme.palette.black
              : theme.palette.white,
            fontSize: 30,
            display: 'block',
          }}
        />
      </button>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.white,
      }}
    >
      <h1 style={{ margin: 0, fontSize: theme.fonts.xLargePlus.fontSize }}>
        COVID-19 Informer
      </h1>
    </div>
    <div
      style={{
        // width: 55,
        height: 55,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      }}
    >
      {'REPORTS' in ROUTES && ROUTES.REPORTS.SHOW_IN_TOP_NAV && ROUTES.REPORTS.ENABLED &&
        <CommandButton
          style={{ marginRight: 15 }}
          iconProps={{
            styles: {
              root: {
                color: 'white',
              },
            },
            iconName: ROUTES.REPORTS.ICON,
          }}
          text={ROUTES.REPORTS.NAME}
          menuProps={{ items: reportItems('REPORTS') }}
          iconColor="white"
          styles={{
            label: {
              color: 'white',
            },
          }}
        />}
      <a href={ROUTES.HOME.PATH}>
        <Image
          src={logo}
          imageFit={ImageFit.centerContain}
          styles={{ root: { marginRight: 10 } }}
          alt="c19i logo."
          width={35}
          height={35}
        />
      </a>
    </div>
  </nav>
);

TopNavBar.defaultProps = {
  dispatch: () => {},
  showMobileMenu: false,
};

TopNavBar.propTypes = {
  dispatch: PropTypes.func,
  showMobileMenu: PropTypes.bool,
};

const mapStateToProps = state => ({
  showMobileMenu: state.app.showMobileMenu,
});

export default connect(mapStateToProps)(TopNavBar);
