import React from 'react';
import { Text } from 'office-ui-fabric-react';
import { theme } from '../../config';

const NoLocationSelected = () => (
  <div className="c19i-chart-container" style={{ marginTop: 10, height: 50 }}>
    <div>
      <Text>
        <h2
          style={{
            margin: 0,
            padding: 0,
            color: theme.palette.black,
            textAlign: 'center',
          }}
        >
          Pick Location to See More Data
          <span role="img" aria-label="Finger pointing up.">☝️</span>
        </h2>
      </Text>
    </div>
  </div>
);

export default NoLocationSelected;
