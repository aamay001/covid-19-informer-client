import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Icon,
} from 'office-ui-fabric-react';
import { theme } from '../../config';

const RouteHeader = ({
  text,
  iconName,
  subText,
}) => (
  <header
    style={{
      width: '100%',
      backgroundImage: 'linear-gradient(to left, #373b44, #4286f4)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      height: 200,
    }}
  >
    <Icon
      iconName={iconName}
      style={{
        color: 'white',
        fontSize: 80,
      }}
    />
    <Text style={{ color: 'white' }}>
      <h1 style={{ marginBottom: 5, marginTop: 5 }}>
        {text}
      </h1>
    </Text>
    <Text style={{ color: 'white', fontSize: theme.fonts.medium.fontSize }}>
      {subText}
    </Text>
  </header>
);

RouteHeader.defaultProps = {
  subText: '',
};

RouteHeader.propTypes = {
  text: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  subText: PropTypes.string,
};

export default RouteHeader;
