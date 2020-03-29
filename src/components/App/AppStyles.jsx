import React from 'react';
import theme from '../../config/theme';

const AppStyles = () => (
  <style>
    {`
      html * {
        box-sizing: border-box;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
      } 

      html {
        background-color: ${theme.palette.white};
        max-width: 100vw;
      }

      div.ms-Dialog-main > div.ms-Modal-scrollableContent > div > div.ms-Dialog-header  button {
        display: none !important;
      }
    `}
  </style>
);

export default AppStyles;
