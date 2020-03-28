import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'office-ui-fabric-react';
import { APP } from '../../config/constants';
import logo from '../../content/images/logo.png';
import theme from '../../config/theme';

const FullLogo = ({ showCompanyName, style }) => (
  <>
    <img
      src={logo}
      alt={`${APP.COMPANY} logo.`}
      style={{
        width: 210,
        padding: 0,
        marginTop: 50,
        ...style,
      }}
    />
    <Text
      style={{
        position: 'relative',
        color: theme.palette.black,
        diplay: 'block',
      }}
    >
      {showCompanyName &&
        <em>
          {APP.COMPANY}
        </em>}
    </Text>
  </>
);

FullLogo.defaultProps = {
  style: {},
  showCompanyName: true,
};

FullLogo.propTypes = {
  style: PropTypes.shape({}),
  showCompanyName: PropTypes.bool,
};

export default FullLogo;
