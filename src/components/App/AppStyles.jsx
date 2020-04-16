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
        max-width: 100vw !important;
        overflow-x: hidden;
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
        width: 450px;
        max-width: 95vw;
        margin-bottom: 15px;
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      }

      // LINKS
      a, a:active, a:visited, a:hover, a:focus {
        color: ${theme.palette.themeTertiary};
        text-decoration: none;
      }

      /* RSS NEWS FEED */
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
      .amzn-native-header {
        color: ${theme.palette.black} !important;
      }
      .amzn-native-product {
        color: ${theme.palette.black} !important;
        background-color: ${theme.palette.white} !important;
      }
      .amzn-native-product-title-container a {
        color: ${theme.palette.themeSecondary} !important;
      }
    `}
  </style>
);

export default AppStyles;
