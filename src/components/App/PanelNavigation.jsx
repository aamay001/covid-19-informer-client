import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Image,
  ImageFit,
  Icon,
  IconType,
} from 'office-ui-fabric-react';
import { toggleMobileMenu } from '../../actions/app.actions';
import { theme, constants } from '../../config';
import logo from '../../content/images/logo.png';

const PanelNavigation = ({ dispatch }) => (
  <div
    style={{
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      color: theme.palette.darkTheme
        ? theme.palette.black
        : theme.palette.white,
    }}
  >
    <div
      style={{
        width: 55,
        height: 55,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
      }}
    >
      <Image
        src={logo}
        imageFit={ImageFit.centerContain}
        alt="c19i logo."
        width={30}
        height={30}
      />
    </div>
    <div>
      <Text
        style={{
          display: 'flex',
          height: '100%',
        }}
      >
        <h1
          style={{
            margin: 0,
            color: theme.palette.darkTheme
              ? theme.palette.black
              : theme.palette.white,
            alignSelf: 'center',
            fontSize: theme.fonts.xLarge.fontSize,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginRight: 10,
          }}
        >
          {constants.APP.NAME}
        </h1>
      </Text>
    </div>
    <button
      type="button"
      style={{
        padding: 0,
        MozAppearance: 'none',
        WebkitAppearance: 'none',
        appearance: 'none',
        backgroundColor: theme.palette.darkTheme
          ? theme.palette.white
          : theme.palette.black,
        outline: 'none',
        border: 'none',
        height: 55,
        width: 55,
      }}
      onClick={() => dispatch(toggleMobileMenu())}
    >
      <Icon
        iconName="Cancel"
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
);

PanelNavigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default PanelNavigation;
