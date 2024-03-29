import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'office-ui-fabric-react';
import { ResponsivePie } from '@nivo/pie';
import JHUSource from './JHUSource';
import WoMSource from './WorldOMeterSource';
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
          Location Totals
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
          top: 25, right: 100, bottom: 80, left: 90,
        }}
        colors={{
          scheme: theme.palette.darkTheme
            ? 'dark2'
            : 'paired',
        }}
        innerRadius={0.5}
        padAngle={3}
        cornerRadius={3}
        fit
        borderWidth={1}
        radialLabel={i => new Intl.NumberFormat().format(i.value)}
        borderColor={{ from: 'color', modifiers: [['darker', 2]] }}
        radialLabelsTextXOffset={-5}
        radialLabelsTextColor={theme.palette.black}
        radialLabelsLinkOffset={-10}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        radialLabelsSkipAngle={5}
        enableSlicesLabels={false}
        animate
        motionStiffness={50}
        motionDamping={5}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            translateX: 25,
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
      {data.updatedAt &&
        (data.wom
          ? <WoMSource date={data.updatedAt} />
          : <JHUSource date={data.updatedAt} />)}
    </div>
  </div>
);

StatsPie.propTypes = {
  data: PropTypes.shape({
    stats: PropTypes.shape({}),
    updatedAt: PropTypes.string,
    wom: PropTypes.bool,
  }).isRequired,
};

export default StatsPie;
