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

      div.c19i-chart-container text {
        font-size: ${theme.fonts.small.fontSize} !important;
      }

      div.c19i-chart-container div span {
        color: black !important;
      }

      div.c19i-chart-container {
        padding: 5px 10px 0px 10px;
        width: 550px;
        max-width: 95vw;
        margin-bottom: 15px;
        height: 385px;
        border-radius: 10px;
        border: 1px solid ${theme.palette.themeTertiary};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `}
  </style>
);

export default AppStyles;
