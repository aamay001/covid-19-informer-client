import React from 'react';
import {
  Image,
  ImageFit,
  Toggle,
} from 'office-ui-fabric-react';
import { ROUTES } from '../../config/constants';
import logo from '../../content/images/logo.png';
import { theme } from '../../config';
import { toggleDarkMode, darkModeState } from '../../config/theme';

const TopNavBar = () => (
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
    <div
      style={{
        // width: 55,
        height: 55,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
      }}
    >
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <h1 style={{ margin: 0, fontSize: theme.fonts.xLarge.fontSize }}>
        COVID-19 Informer
      </h1>
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 7,
      }}
    >
      <Toggle
        checked={darkModeState}
        onText="🌙"
        offText="🔆"
        styles={{ text: { color: 'white', fontSize: theme.fonts.medium.fontSize } }}
        onChange={(e, state) => toggleDarkMode(state)}
      />
    </div>
  </nav>
);

export default TopNavBar;
