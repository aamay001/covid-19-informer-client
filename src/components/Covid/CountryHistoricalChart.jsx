import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Spinner,
  SpinnerSize,
  Icon,
} from 'office-ui-fabric-react';
import { ResponsiveLine } from '@nivo/line';
import JHUSource from './JHUSource';
import { theme } from '../../config';
import api from '../../helpers/api.helper';
import { APP } from '../../config/settings';

const CountryHistoricalChart = ({ country }) => {
  const [state, setData] = useState({});
  const isDataAvailble = !!state === false;
  useEffect(() => {
    api.GetHistoricalByCountry(country)
      .then((res) => {
        if (res) {
          setData({
            data: [
              {
                id: 'cases',
                data: Object.keys(res.data.timeline.cases)
                  .filter((f, index, arr) =>
                    (index === 0 || index === arr.length - 1 ||
                      index % APP.DATA_SUMMARIZATION_INTERVAL === 0))
                  .map(d => ({
                    x: d,
                    y: res.data.timeline.cases[d],
                  })),
              },
              {
                id: 'deaths',
                data: Object.keys(res.data.timeline.deaths)
                  .filter((f, index, arr) =>
                    (index === 0 || index === arr.length - 1 ||
                      index % APP.DATA_SUMMARIZATION_INTERVAL === 0))
                  .map(d => ({
                    x: d,
                    y: res.data.timeline.deaths[d],
                  })),
              },
              {
                id: 'recovered',
                data: Object.keys(res.data.timeline.recovered)
                  .filter((f, index, arr) =>
                    (index === 0 || index === arr.length - 1 ||
                      index % APP.DATA_SUMMARIZATION_INTERVAL === 0))
                  .map(d => ({
                    x: d,
                    y: res.data.timeline.recovered[d],
                  })),
              },
            ],
            date: res.updated,
            noData: false,
          });
        } else {
          setData({
            noData: true,
          });
        }
      });
  }, [isDataAvailble, country]);
  const { data, date, noData } = state;
  return (
    <div className="c19i-chart-container" id="c19i-global-cases-over-time">
      <div>
        <Text>
          <h2
            style={{
              margin: 0,
              color: theme.palette.black,
              paddingTop: 5,
            }}
          >
            Historical Cases in Country
          </h2>
        </Text>
      </div>
      {!data && !noData &&
        <div style={{ marginTop: 15 }}>
          <Spinner size={SpinnerSize.large} />
        </div>}
      {noData &&
        <Fragment>
          <Icon iconName="Warning" styles={{ root: { fontSize: 35 } }} />
          <span>Data could not be loaded for this module.</span>
        </Fragment>}
      {data && !noData &&
        <div style={{ height: 315, width: '100%' }}>
          <ResponsiveLine
            data={data}
            margin={{
              top: 30,
              right: 25,
              bottom: 75,
              left: 90,
            }}
            curve="natural"
            xScale={{
              type: 'point',
              stacked: true,
            }}
            yScale={{
              type: 'linear',
              min: 0,
              max: 'auto',
              stacked: false,
            }}
            axisTop={null}
            axisRight={null}
            isInteractive
            useMesh
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -50,
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 15,
              format: i => new Intl.NumberFormat().format(i),
            }}
            yFormat={i => new Intl.NumberFormat().format(i)}
            enableGridX
            enableGridY
            colors={{
              scheme: 'category10',
            }}
            pointSize={10}
            pointLabelYOffset={-80}
            enableArea
            animate
            motionStiffness={50}
            motionDamping={5}
            enableCrosshair
            legends={[
              {
                anchor: 'top',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: -20,
                itemsSpacing: 20,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                itemTextColor: theme.palette.black,
              },
            ]}
          />
        </div>}
      <div>
        {date && !noData &&
          <JHUSource date={date} />}
      </div>
      <style>
        {`
          #c19i-global-cases-over-time > div > div > div > svg > g text {
            fill: ${theme.palette.black} !important;
          }
        `}
      </style>
    </div>
  );
};

CountryHistoricalChart.propTypes = {
  country: PropTypes.string.isRequired,
};

export default CountryHistoricalChart;
