import React, { useEffect, useState, Fragment } from 'react';
import {
  Text,
  Spinner,
  SpinnerSize,
  Icon,
} from 'office-ui-fabric-react';
import { ResponsivePie } from '@nivo/pie';
import WorldOMeterSource from './WorldOMeterSource';
import { theme } from '../../config';
import api from '../../helpers/api.helper';

const GlobalTotalsPie = () => {
  const [state, setData] = useState({});
  const isDataAvailble = !!state === false;
  useEffect(() => {
    api.GetGlobalTotals()
      .then((res) => {
        if (res) {
          setData({
            data: Object.keys(res)
              .filter(key =>
                ['recovered', 'active', 'deaths', 'cases'].includes(key))
              .map(key => ({
                id: key,
                label: key,
                value: parseInt(res[key], 10),
              })),
            date: res.updated,
            noData: false,
          });
        } else {
          setData({
            noData: true,
          });
        }
      });
  }, [isDataAvailble]);
  const { data, date, noData } = state;
  return (
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
            Gobal Totals
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
          <ResponsivePie
            data={data}
            margin={{
              top: 25,
              right: 100,
              bottom: 50,
              left: 95,
            }}
            colors={{
              scheme: theme.palette.darkTheme
                ? 'dark2'
                : 'set2',
            }}
            innerRadius={0.5}
            padAngle={3}
            cornerRadius={3}
            fit={false}
            borderWidth={1}
            sliceLabel={i => new Intl.NumberFormat().format(i.value)}
            tooltipFormat={i => new Intl.NumberFormat().format(i)}
            radialLabel={i => i.id}
            radialLabelsLinkOffset={-10}
            radialLabelsTextXOffset={10}
            radialLabelsTextColor={theme.palette.black}
            slicesLabelsTextColor={theme.palette.black}
            radialLabelsLinkStrokeWidth={2}
            radialLabelsLinkColor={{ from: 'color' }}
          />
        </div>}
      {date && !noData &&
        <WorldOMeterSource date={date} />}
    </div>
  );
};

export default GlobalTotalsPie;
