import React from 'react';
import { Text } from 'office-ui-fabric-react';
import Fade from 'react-reveal/Fade';
import { theme } from '../../config';

const NoLocationSelected = () => (
  <Fade down mountOnEnter>
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
            Pick Location to See Data
            <span role="img" aria-label="Finger pointing up.">☝️</span>
          </h2>
        </Text>
      </div>
    </div>
  </Fade>
);

export default NoLocationSelected;
