/* globals document */
import React, { Component } from 'react';
import { theme } from '../../config';

class AmazonAds extends Component {
  componentDidMount() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = '//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=03b97141-dc44-4401-9f6d-7745e1682edb';
    this.parentDiv.appendChild(s);
  }

  render() {
    return (
      <div
        ref={(el) => { this.parentDiv = el; }}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: 10,
          color: theme.palette.black,
          backgroundColor: theme.palette.white,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div id="amzn-assoc-ad-03b97141-dc44-4401-9f6d-7745e1682edb" />
      </div>
    );
  }
}

export default AmazonAds;
