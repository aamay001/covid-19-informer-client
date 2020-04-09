import React from 'react';
import PropTypes from 'prop-types';

const RSSNewsFeedItem = ({
  title,
  link,
  date,
  content,
}) => (
  <div
    className="c19i-who-news-item"
    key={title}
  >
    <a href={link} target="_new">
      <h1>
        {title.trim().substr(0, 85)}
        {(title.trim().length > 85 ? '...' : '')}
      </h1>
      <sub>
        {date}
      </sub>
    </a>
    <div
      id="c19i-who-news-content"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `${content.trim()
          .replace(/(style=")(.*?)"/g, '')
          .replace(/(<img)(.*?)(\/>)/g, '')
          .replace('&nbsp;', '')
          .replace('<p></p>', '')
          .replace('<div></div>')
          .substr(0, 300)}${content.length > 300 ? '...' : ''}`,
      }}
    />
    <a href={link} target="_new">
      Read Full Story
    </a>
  </div>
);

RSSNewsFeedItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default RSSNewsFeedItem;
