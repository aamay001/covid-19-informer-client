import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Slider } from 'office-ui-fabric-react';
import { ResponsiveChoropleth } from '@nivo/geo';
import { theme } from '../../config';
import WorldOMeterSource from './WorldOMeterSource';
import mapFeatures from '../../content/maps/world-countries';

const GeoChoropleth = ({ data }) => {
  const [sliderPosition, setPosition] = useState(0);
  if (!data || data.length === 0) {
    return null;
  }
  const mapData = data.map(c => ({ id: c.countryInfo.iso3, value: c.cases }));
  const sortedData = data.sort((a, b) => b.cases - b.cases);
  const maxValue = sortedData[0].cases;
  return (
    <div className="c19i-chart-container" style={{ width: '97%', height: 600 }}>
      <div>
        <Text>
          <h2
            style={{
              margin: 0,
              color: theme.palette.black,
              paddingTop: 5,
            }}
          >
            Gobal Distribution
          </h2>
        </Text>
      </div>
      {mapData &&
        <div
          style={{
            height: '80%',
            width: '100%',
            marginTop: 10,
            border: `1px solid ${theme.palette.themeTertiary}`,
          }}
        >
          <ResponsiveChoropleth
            features={mapFeatures}
            data={mapData}
            margin={{
              top: 0, right: 0, bottom: 0, left: 0,
            }}
            colors={theme.palette.darkTheme
              ? 'blues'
              : 'oranges'}
            domain={[0, maxValue + 150000]}
            unknownColor={theme.palette.themeLighterAlt}
            label="properties.name"
            valueFormat=".2s"
            borderWidth={0.5}
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[sliderPosition, 0, 0]}
            projectionScale={200}
            projectionType="mercator"
            graticuleLineColor={theme.palette.themeTertiary}
            borderColor="#152538"
            legends={[
              {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: theme.palette.black,
                itemOpacity: 0.85,
                symbolSize: 18,
              },
            ]}
          />
        </div>}
      <Slider
        min={-360}
        max={360}
        step={1}
        defaultValue={0}
        showValue={false}
        value={sliderPosition}
        onChange={setPosition}
        styles={{
          root: {
            width: '100%',
          },
        }}
      />
      <WorldOMeterSource date={data[0].updated} />
    </div>
  );
};

GeoChoropleth.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    countryInfo: PropTypes.shape({
      iso3: PropTypes.string,
    }),
    updated: PropTypes.number,
  })).isRequired,
};

export default GeoChoropleth;
