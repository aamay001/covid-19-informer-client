/* eslint-disable no-console */
/* globals document */

const setTitle = (title) => {
  try {
    document.title = title;
    document.querySelector('meta[property="og:title"').content = title;
  } catch (e) {
    console.error('No OG title tag found.');
  }
};

const setImage = (image) => {
  try {
    document.querySelector('meta[property="og:image"').content = image;
  } catch (e) {
    console.error('No OG image tag found.');
  }
};

export default {
  setImage,
  setTitle,
};