import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'office-ui-fabric-react';
import Fade from 'react-reveal/Fade';

const RouteRootFlex = ({ children, style, id }) => (
  <Fade left duration={500} distance="25px">
    <Text>
      <div
        id={id}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 0,
          marginTop: 55,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: 75,
          ...style,
        }}
      >
        {children}
      </div>
    </Text>
  </Fade>
);

RouteRootFlex.defaultProps = {
  style: {},
  id: undefined,
  children: undefined,
};

RouteRootFlex.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  style: PropTypes.shape({}),
  id: PropTypes.string,
};

export default RouteRootFlex;
