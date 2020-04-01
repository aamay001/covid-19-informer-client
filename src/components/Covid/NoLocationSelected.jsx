import React from 'react';
import { Text } from 'office-ui-fabric-react';
import { theme } from '../../config';

const NoLocationSelected = () => (
  <div className="c19i-chart-container" style={{ justifyContent: 'center' }}>
    <div>
      <Text>
        <h2 style={{ margin: 0, color: theme.palette.black }}>
          Pick a Location to Load Data
          <span role="img" aria-label="Finger pointing up.">☝️</span>
        </h2>
      </Text>
    </div>
  </div>
);

export default NoLocationSelected;
