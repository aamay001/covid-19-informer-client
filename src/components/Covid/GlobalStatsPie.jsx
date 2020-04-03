import React, { useEffect, useState } from 'react';
import { Text, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { ResponsivePie } from '@nivo/pie';
import WorldOMeterSource from './WorldOMeterSource';
import { theme } from '../../config';
import api from '../../helpers/api.helper';

const GlobalTotalsPie = () => {
  const [data, setData] = useState(undefined);
  const isDataAvailble = !!data === false;
  useEffect(() => {
    api.GetGlobalTotals()
      .then((res) => {
        setData(Object.keys(res)
          .filter(key =>
            ['recovered', 'active', 'deaths', 'cases'].includes(key))
          .map(key => ({
            id: key,
            label: key,
            value: parseInt(res[key], 10),
          })));
      });
  }, [isDataAvailble]);
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
      {!data &&
        <div style={{ marginTop: 15 }}>
          <Spinner size={SpinnerSize.large} />
        </div>}
      {data &&
        <div style={{ height: 315, width: '100%' }}>
          <ResponsivePie
            data={data}
            margin={{
              top: 25, right: 100, bottom: 50, left: 90,
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
            radialLabel={i => i.id}
            radialLabelsLinkOffset={-10}
            radialLabelsTextXOffset={10}
            radialLabelsTextColor={theme.palette.black}
            slicesLabelsTextColor={theme.palette.black}
            radialLabelsLinkStrokeWidth={2}
            radialLabelsLinkColor={{ from: 'color' }}
          />
        </div>}
      {data &&
        <WorldOMeterSource date={data.updated} />}
    </div>
  );
};

export default GlobalTotalsPie;
