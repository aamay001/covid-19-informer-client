import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'office-ui-fabric-react';
import { ResponsivePie } from '@nivo/pie';
import JHUSource from './JHUSource';
import { theme } from '../../config';

const StatsPie = ({ data }) => (
  <div className="c19i-chart-container">
    <div>
      <Text>
        <h2
          style={{
            margin: 0,
            color: theme.palette.black,
            paddingTop: 5,
          }}
        >
          Case Stats
        </h2>
      </Text>
    </div>
    <div style={{ height: 315, width: '100%' }}>
      <ResponsivePie
        data={Object.keys(data.stats || {}).map(key => ({
          id: key,
          label: key,
          value: parseInt(data.stats[key], 10),
        }))}
        margin={{
          top: 40, right: 80, bottom: 90, left: 80,
        }}
        colors={{
          scheme: theme.palette.darkTheme
            ? 'dark2'
            : 'paired',
        }}
        innerRadius={0.5}
        padAngle={3}
        cornerRadius={3}
        fit={false}
        borderWidth={1}
        sliceLabel={i => new Intl.NumberFormat().format(i.value)}
        borderColor={{ from: 'color', modifiers: [['darker', 1.7]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={10}
        radialLabelsTextColor={theme.palette.black}
        radialLabelsLinkOffset={-15}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor={theme.palette.black}
        animate
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            translateY: 80,
            itemWidth: 110,
            itemHeight: 15,
            itemTextColor: theme.palette.black,
            symbolSize: 15,
            symbolShape: 'circle',
          },
        ]}
      />
    </div>
    <div>
      <JHUSource date={data.updatedAt} />
    </div>
  </div>
);

StatsPie.propTypes = {
  data: PropTypes.shape({
    stats: PropTypes.shape({}),
    updatedAt: PropTypes.string,
  }).isRequired,
};

export default StatsPie;
