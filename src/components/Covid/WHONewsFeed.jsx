import React, { Fragment, useEffect, useState } from 'react';
import {
  Text,
  Spinner,
  SpinnerSize,
  Icon,
  IconButton,
} from 'office-ui-fabric-react';
import ItemCarousel from 'react-items-carousel';
import parse from 'date-fns/parse';
import WHOSource from './WHOSource';
import { theme } from '../../config';
import api from '../../helpers/api.helper';

const WHONewsFeed = () => {
  const [state, setState] = useState({});
  const isDataAvailble = !!state === false;
  useEffect(() => {
    api.GetWHONews()
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
                <div
                  className="c19i-who-news-item"
                  key={d.title}
                >
                  <a href={d.link} target="_new">
                    <h1>
                      {d.title.trim().substr(0, 85)}
                      {(d.title.trim().length > 85 ? '...' : '')}
                    </h1>
                    <sub>
                      {date}
                    </sub>
                  </a>
                  <div
                    id="c19i-who-news-content"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: `${d.content.trim()
                        .replace(/(style=")(.*?)"/g, '')
                        .replace(/(<img)(.*?)(\/>)/g, '')
                        .replace('&nbsp;', '')
                        .replace('<p></p>', '')
                        .replace('<div></div>')
                        .substr(0, 300)}...`,
                    }}
                  />
                  <a href={d.link} target="_new">
                    Read Full Story
                  </a>
                </div>
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
      <style>
        {`
          div.c19i-who-news-item {
            padding: 0 20px 0 35px;
            width: 100%;
            max-height: 310px;
            min-height: 250px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            overflow-y: hidden;
            color: ${theme.palette.black} !important;
          }
          div.c19i-who-news-item a,
          div.c19i-who-news-item a:visited,
          div.c19i-who-news-item a:hover {
            color: ${theme.palette.black};
          }
          div.c19i-who-news-item a h1 {
            padding-top: 0px;
            margin-top: 7px;
            margin-bottom: 0;
            font-size: ${theme.fonts.large.fontSize};
            font-weight: bold;
            max-height: 70px;
            line-height: 1.25;
            overflow: hidden;
          }
          div.c19i-who-news-item a sub {
            color: gray;
          }
          #c19i-who-news-content {
            margin-top: 5px;
            margin-bottom: 10px;
            min-height: 160px;
            max-height: 215px;
            padding-top: 5px;
            padding-right: 10px;
            overflow-y: hidden;
          }
          #c19i-who-news-content * {
            padding: 0;
            margin: 0;
            line-height: 1.15;
            color: ${theme.palette.black} !important;
          }
          #c19i-home-route div a:nth-child(3) {
            width: 100%;
            display: block;
            border: 1px solid ${theme.palette.themeTertiary};
            padding: 7px;
            text-align: center;
            border-radius: 10px;
          }
          #c19i-home-route div a:nth-child(3):hover {
            background-color: ${theme.palette.themeSecondary};
            color: white;
          }
        `}
      </style>
      <div>
        <Text>
          <h2
            style={{
              margin: 0,
              color: theme.palette.black,
              paddingTop: 5,
            }}
          >
            WHO News
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
      {date && !noData &&
        <WHOSource date={date} />}
    </div>
  );
};

export default WHONewsFeed;
