import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Spinner,
  SpinnerSize,
  Icon,
  IconButton,
} from 'office-ui-fabric-react';
import ItemCarousel from 'react-items-carousel';
import parse from 'date-fns/parse';
import RSSNewsFeedItem from './RSSNewsFeedItem';
import CDCSource from './CDCSource';
import WHOSource from './WHOSource';
import api from '../../helpers/api.helper';
import { theme } from '../../config';

const RSSNewsFeed = ({
  title,
  apiMethod,
  source,
}) => {
  const [state, setState] = useState({});
  const isDataAvailble = !!state === false;
  useEffect(() => {
    api[apiMethod]()
      .then((res) => {
        if (res) {
          setState({
            data: res.data.map((d) => {
              let date = parse(d.pubDate);
              // eslint-disable-next-line eqeqeq
              date = date == 'Invalid Date'
                ? d.pubDate.replace('Z', '')
                : parse(d.pubDate).toLocaleString();
              return (
                <RSSNewsFeedItem
                  key={d.guid}
                  title={d.title}
                  link={d.link}
                  date={date}
                  content={d.content}
                />
              );
            }).slice(0, 9),
            date: res.date,
            noData: false,
            activeItemIndex: 0,
          });
        } else {
          setState({
            noData: true,
          });
        }
      });
  }, [isDataAvailble]);
  const {
    data,
    date,
    noData,
    activeItemIndex,
  } = state;
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
            {title}
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
          <ItemCarousel
            gutter={12}
            outsideChevron
            numberOfCards={1}
            activeItemIndex={activeItemIndex}
            requestToChangeActive={(i) => {
              setState({
                ...state,
                activeItemIndex: i,
              });
            }}
            rightChevron={
              <IconButton
                iconProps={{
                  iconName: 'ChevronRight',
                  style: {
                    color: theme.palette.black,
                  },
                }}
                title="Right"
                ariaLabel="Right"
              />
            }
            leftChevron={
              <IconButton
                iconProps={{
                  iconName: 'ChevronLeft',
                  style: {
                    color: theme.palette.black,
                  },
                }}
                title="Left"
                ariaLabel="Left"
              />
            }
            chevronWidth={50}
          >
            {data}
          </ItemCarousel>
        </div>}
      {date && !noData && (
        <Fragment>
          {source === 'WHO' && <WHOSource date={date} />}
          {source === 'CDC' && <CDCSource date={date} />}
        </Fragment>
      )}
    </div>
  );
};

RSSNewsFeed.propTypes = {
  apiMethod: PropTypes.oneOf([
    'GetWHONews',
    'GetCDCNews',
  ]).isRequired,
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default RSSNewsFeed;
