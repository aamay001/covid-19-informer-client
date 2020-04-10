import React from 'react';
import { theme } from '../../config';

const Footer = () => (
  <div
    style={{
      color: theme.palette.black,
      borderTop: `1px solid ${theme.palette.themeTertiary}`,
      textAlign: 'center',
      height: 75,
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: 15,
      marginBottom: 15,
    }}
  >
    Built by
    {' '}
    <a href="https://andyamaya.com/" target="_new">Andy Amaya</a>
    {' '}
    during the Quarantine 2020! 👍🏽
    <p>Stay Safe, Stay Home!</p>
  </div>
);

export default Footer;
