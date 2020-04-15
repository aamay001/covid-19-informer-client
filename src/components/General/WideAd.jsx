/* globals document */
import React, { Component } from 'react';

class WideAd extends Component {
  componentDidMount() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerHTML = `try {
      window._mNHandle.queue.push(function () {
        window._mNDetails.loadTag("659040877", "970x250", "659040877");
      });
    } catch (error) {
      console.log(error);
    }`;
    this.parentDiv.appendChild(s);
  }

  render() {
    return (
      <div id="659040877" ref={(el) => { this.parentDiv = el; }} />
    );
  }
}

export default WideAd;
